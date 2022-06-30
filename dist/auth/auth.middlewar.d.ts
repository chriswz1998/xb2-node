import { Request, Response, NextFunction } from 'express';
export declare const validateLoginDate: (request: Request, response: Response, next: NextFunction) => Promise<void>;
export declare const authGuard: (request: Request, response: Response, next: NextFunction) => void;
interface AccessControlOptions {
    possession?: boolean;
}
export declare const accessControl: (options: AccessControlOptions) => (request: Request, response: Response, next: NextFunction) => Promise<void>;
export {};
