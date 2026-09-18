import mongoose, { type Mongoose } from "mongoose";

/**
 * Connection string resolution.
 *
 * Accepts either a full MONGODB_URI, or the discrete DB_* variables that most
 * cPanel / managed Node panels expose. Passwords are URL-encoded here, because
 * an unescaped @ : / or ? in a password silently breaks the URI.
 */
export function resolveMongoUri(): { uri: string; source: string } {
  const direct = process.env.MONGODB_URI?.trim();
  if (direct) return { uri: direct, source: "MONGODB_URI" };

  const host = process.env.DB_HOST?.trim();
  const name = process.env.DB_NAME?.trim();
  const user = process.env.DB_USER?.trim();
  const pass = (process.env.DB_PASS ?? process.env.DB_PASSWORD)?.trim();
  const port = process.env.DB_PORT?.trim();

  if (!host) {
    throw new Error(
      "No database configuration found. The process cannot see MONGODB_URI or DB_HOST. " +
        "If these live in a .env file, confirm it was uploaded and sits beside package.json in the " +
        "directory the app starts from. On managed Node hosting, set them in the panel instead.",
    );
  }

  const credentials = user ? `${encodeURIComponent(user)}:${encodeURIComponent(pass ?? "")}@` : "";
  const database = name ? `/${name}` : "";

  // Atlas hosts use SRV records and must not carry a port.
  const isAtlas = host.endsWith("mongodb.net");
  if (isAtlas && !port) {
    return {
      uri: `mongodb+srv://${credentials}${host}${database}?retryWrites=true&w=majority`,
      source: "DB_* (mongodb+srv)",
    };
  }

  return {
    uri: `mongodb://${credentials}${host}:${port || "27017"}${database}?retryWrites=true&w=majority${
      isAtlas ? "&tls=true&authSource=admin" : ""
    }`,
    source: "DB_* (standard)",
  };
}

interface Cache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalForMongo = globalThis as unknown as { mongoose?: Cache };
const cached: Cache = globalForMongo.mongoose ?? { conn: null, promise: null };
globalForMongo.mongoose = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn && cached.conn.connection.readyState === 1) return cached.conn;

  if (!cached.promise) {
    const { uri, source } = resolveMongoUri();
    console.info(`[db] connecting using ${source}`);

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      family: 4, // some hosts resolve AAAA records they cannot actually route
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("[db] connection failed:", error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * What the running process can actually see. Reports presence only, never values,
 * so this is safe to expose while debugging a deployment.
 */
export function environmentReport() {
  const present = (key: string) => Boolean(process.env[key]?.trim());
  return {
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV ?? null,
    seen: {
      MONGODB_URI: present("MONGODB_URI"),
      DB_HOST: present("DB_HOST"),
      DB_PORT: present("DB_PORT"),
      DB_NAME: present("DB_NAME"),
      DB_USER: present("DB_USER"),
      DB_PASS: present("DB_PASS") || present("DB_PASSWORD"),
    },
    // enough to confirm the right cluster without revealing credentials
    uriScheme: process.env.MONGODB_URI?.trim().split("://")[0] ?? null,
    uriHostHint: process.env.MONGODB_URI?.trim().split("@")[1]?.split("/")[0]?.slice(0, 48) ?? null,
  };
}

/** Never throws: used by the health endpoint to report rather than crash. */
export async function checkDatabase() {
  const env = environmentReport();
  try {
    const { source } = resolveMongoUri();
    const conn = await connectToDatabase();
    await conn.connection.db?.admin().ping();
    return { ok: true as const, source, state: conn.connection.readyState, database: conn.connection.name, env };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false as const, message, hint: diagnose(message), env };
  }
}

function diagnose(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("querysrv") || m.includes("srv"))
    return "The SRV lookup failed. Shared hosts often block SRV DNS records. Use the non-SRV connection string from Atlas (Connect → Drivers → Node.js 2.2.12 or earlier) and put it in MONGODB_URI.";
  if (m.includes("authentication failed") || m.includes("bad auth"))
    return "Credentials rejected. Check the database user and password, and that the user has readWrite on this database.";
  if (m.includes("timed out") || m.includes("serverselection"))
    return "Could not reach the server. Add 0.0.0.0/0 to the Atlas Network Access list, and confirm your host allows outbound connections on port 27017.";
  if (m.includes("econnrefused"))
    return "Connection refused. The host or port is wrong, or outbound database traffic is blocked by the hosting firewall.";
  if (m.includes("no database configuration"))
    return "Environment variables are not reaching the app. Confirm the names match exactly and restart the Node process after saving them.";
  return "Check the server logs for the full error.";
}
