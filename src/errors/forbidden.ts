import { Status } from "./error-codes";

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = Status.FORBIDDEN;
  }
}

export default ForbiddenError;
