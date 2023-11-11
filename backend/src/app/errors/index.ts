export class APIError {
  constructor(
    public message: string,
    public status: number,
    public type: string = 'APIError'
  ) {}
}

export class NotFoundError extends APIError {
  constructor() {
    super('Not found', 404)
  }
}
