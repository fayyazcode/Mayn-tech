import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    company: { type: String, trim: true, maxlength: 160, default: null },
    service: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    source: { type: String, default: "website" },
    ipHash: { type: String, default: null },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

EnquirySchema.index({ createdAt: -1 });

export type EnquiryDocument = InferSchemaType<typeof EnquirySchema>;

// `models.Enquiry ??` keeps hot reload from redefining the model and throwing.
export const Enquiry: Model<EnquiryDocument> =
  (models.Enquiry as Model<EnquiryDocument>) ?? model<EnquiryDocument>("Enquiry", EnquirySchema);
