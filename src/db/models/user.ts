// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  apiToken: string;
  pinCode: string;
  name?: string;
  email?: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    apiToken: { type: String, required: true },
    pinCode: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { collection: "users" },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
