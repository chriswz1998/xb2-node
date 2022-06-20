"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByName = exports.createUser = void 0;
const mysql_1 = require("../app/database/mysql");
const createUser = async (user) => {
    const statement = `
        insert into user
        set ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, user);
    return data;
};
exports.createUser = createUser;
const getUsersByName = async (name) => {
    const statement = `
        select id, name from user
        where name = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, name);
    return data[0];
};
exports.getUsersByName = getUsersByName;
//# sourceMappingURL=user.service.js.map