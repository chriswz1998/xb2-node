import { Request, Response, NextFunction } from 'express';
export declare const requestUrl: (req: Request, res: Response, next: NextFunction) => void;
export declare const defaultErrorHandler: (error: any, request: Request, response: Response, next: NextFunction) => void;
