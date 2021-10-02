import mongoose from "mongoose"; // ORM for mongodb
import bcrypt from "bcrypt"; // for password hashes
import config from "config"; // configuration
import log from "../logger"; // logging

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // automatic created and updated timestamps
);

UserSchema.pre("save", async function () {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return;

  // Random additional data
  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  // create hash from plaintext user.password and salt.
  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  log.info("Created new user: ", user);
});


// compare password with saved password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
