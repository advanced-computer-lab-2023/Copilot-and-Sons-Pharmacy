class AppError extends Error {
  statusCode: number
  httpStatusText: string

  constructor(message: string, statusCode: number, httpStatusText: string) {
    super(message)
    this.statusCode = statusCode
    this.httpStatusText = httpStatusText
  }
}

export default AppError
