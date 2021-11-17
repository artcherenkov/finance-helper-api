import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import UnauthorizedError from "../errors/unauthorized";

export interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  return bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((u: IUser) => {
      if (!u) {
        throw new UnauthorizedError("Неверный логин или пароль.");
      }

      return bcrypt.compare(password, u.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Неверный логин или пароль.");
        }
        return u;
      });
    });
};

export default mongoose.model("user", userSchema);
