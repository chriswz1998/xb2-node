interface SignTokenOptions {
    payload?: any;
}
export declare const signToken: (options: SignTokenOptions) => string;
interface ProcessOptions {
    resourceId: number;
    resourceType: string;
    userId: number;
}
export declare const possess: (options: ProcessOptions) => Promise<boolean>;
export {};
