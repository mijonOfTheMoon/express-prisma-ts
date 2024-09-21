export interface ApiError {
  status: boolean;
  statusCode: number;
  message: string;
}

export class ApiErrorClass extends Error {
  public status: boolean;
  public statusCode: number;

  constructor(status: boolean, statusCode: number, message: string) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.name = "ApiError";
    
    // Set the prototype explicitly to maintain correct instanceof behavior
    Object.setPrototypeOf(this, ApiErrorClass.prototype);
  }
}