import { Request, Response ,NextFunction} from 'express';

export default(error: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (error as any).statusCode || 500;
    const statusText = (error as any).httpStatusText || 'Internal Server Error';
  
    res.status(statusCode).json({
      status: statusText,
      message: error.message,
      code: statusCode,
      data: null,
    });
  }