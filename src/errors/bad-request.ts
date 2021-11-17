import { Status } from "./error-codes";

class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = Status.BAD_REQUEST;
  }
}

export default BadRequestError;
