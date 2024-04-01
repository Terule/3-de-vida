export class  PrismaError extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(statusCode: number, message: string, errorCode: string) {
    super(message);
    
    this.name = "PrismaError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}