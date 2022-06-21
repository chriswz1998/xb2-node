import { Request, Response, NextFunction } from 'express';
export declare const login: (request: Request, response: Response, next: NextFunction) => Promise<void>;
export declare const validate: (request: Request, response: Response, next: NextFunction) => Promise<void>;
