import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  user: string;
  bot: string;
}

const messageSchema = new Schema<IMessage>({
  user: { type: String, required: true },
  bot: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>("Message", messageSchema);
