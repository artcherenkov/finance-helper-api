import { Status } from "./error-codes";

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = Status.NOT_FOUND;
  }
}

export default NotFoundError;
