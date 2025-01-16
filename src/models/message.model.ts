import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  userId: string; // Added userId
  user: string;
  bot: string;
}

const messageSchema = new Schema<IMessage>({
  userId: { type: String, required: true }, // Added userId field
  user: { type: String, required: true },
  bot: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>("Message", messageSchema);
