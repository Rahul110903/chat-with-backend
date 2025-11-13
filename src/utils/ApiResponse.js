class ApiError {
  constructor(data, message = "Success", statusCode) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiError };