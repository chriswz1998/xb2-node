import { Request, Response, NextFunction } from 'express';
export declare const index: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const store: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const destroy: (req: Request, res: Response, next: NextFunction) => Promise<void>;
