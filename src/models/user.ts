import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

import UnauthorizedError from "../errors/unauthorized";

export interface IUser {
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials(
    email: string,
    password: string
  ): Promise<mongoose.Document<IUser>>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
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
    .then((u: mongoose.Document<IUser> | null) => {
      if (!u) {
        throw new UnauthorizedError("Неверный логин или пароль.");
      }

      const user = u.toObject() as IUser;

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Неверный логин или пароль.");
        }
        return user;
      });
    });
};

export default mongoose.model<IUser, UserModel>("user", userSchema);
