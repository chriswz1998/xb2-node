"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.possess = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../app/app.config");
const mysql_1 = require("../app/database/mysql");
const signToken = (options) => {
    const { payload } = options;
    return jsonwebtoken_1.default.sign(payload, app_config_1.PRIVATE_KEY, { algorithm: 'RS256' });
};
exports.signToken = signToken;
const possess = async (options) => {
    const { resourceId, resourceType, userId } = options;
    const statement = `
        select count(${resourceType}.id) as count
        from ${resourceType}
        where ${resourceType}.id = ? and userId = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [resourceId, userId]);
    return !!data[0].count;
};
exports.possess = possess;
//# sourceMappingURL=auth.service.js.map