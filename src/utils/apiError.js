class ApiError {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
  }
}
export { ApiError };
