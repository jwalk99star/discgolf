import { Schema } from "mongoose";

export const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    imgUrl: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'intermediate', 'advanced'], required: true },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)