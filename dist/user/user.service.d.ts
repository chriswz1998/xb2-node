import { UserModel } from './user.model';
export declare const createUser: (user: UserModel) => Promise<import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader")>;
interface GetUserOptions {
    password?: boolean;
}
export declare const getUsersByName: (name: string, options?: GetUserOptions) => Promise<any>;
export {};
