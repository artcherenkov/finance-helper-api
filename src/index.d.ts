import { IUser } from "./models/user";

interface Locals {
  user?: mongoose.Document<IUser>;
}

declare module "express" {
  export interface Response {
    locals: Locals;
  }
}
