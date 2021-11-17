import { Status } from "./error-codes";

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = Status.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
