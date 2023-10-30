import { Request, Response, NextFunction } from 'express'

export default (
  asyncfn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncfn(req, res, next).catch((err: Error) => {
      next(err)
    })
  }
}
