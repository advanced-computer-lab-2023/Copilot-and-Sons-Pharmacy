import { Request, Response, NextFunction } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'

export default function <ReqBody = any>(
  asyncfn: (
    req: Request<ParamsDictionary, any, ReqBody>,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncfn(req, res, next).catch((err: Error) => {
      next(err)
    })
  }
}
