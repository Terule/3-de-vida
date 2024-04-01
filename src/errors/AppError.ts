export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(statusCode: number, message: string) {
    super(message || 'Internal server error');
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}