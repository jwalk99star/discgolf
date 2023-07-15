import { Schema } from "mongoose";

export const CommentSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    content: { type: String, required: true }
  }
)