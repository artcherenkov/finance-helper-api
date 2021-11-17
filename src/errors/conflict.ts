import { Status } from "./error-codes";

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = Status.CONFLICT;
  }
}

export default ConflictError;
