export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function getErrorMessage(error) {
  if (!error) return "Something went wrong.";
  if (error instanceof ApiError) return error.message;
  if (error.message === "Failed to fetch") return "You seem to be offline. Check your connection and try again.";
  return "Something went wrong. Please try again.";
}
