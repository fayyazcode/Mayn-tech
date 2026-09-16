export default function Loading() {
  return (
    <div className="shell flex min-h-[60vh] items-center">
      <div className="w-full max-w-md space-y-4" aria-hidden>
        <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-10 w-full animate-pulse rounded bg-white/[0.07]" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-white/[0.07]" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
