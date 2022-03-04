import { Document, Schema, model } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';

import config from 'config';

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await genSalt(config.get("saltWorkFactor"));

  // Replace the password with the hash
  user.password = await hash(user.password, salt);

  return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const user = this as UserDocument;

  return compare(candidatePassword, user.password).catch((e) => false);
};

const User = model<UserDocument>('User', UserSchema);

export { User };
