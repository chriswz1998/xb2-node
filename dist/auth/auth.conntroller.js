"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.login = void 0;
const auth_service_1 = require("./auth.service");
const login = async (request, response, next) => {
    const { user: { id, name } } = request.body;
    const payload = { id, name };
    try {
        const token = (0, auth_service_1.signToken)({ payload });
        response.send({ id, name, token });
    }
    catch (e) {
        next(e);
    }
};
exports.login = login;
const validate = async (request, response, next) => {
    response.sendStatus(200);
};
exports.validate = validate;
//# sourceMappingURL=auth.conntroller.js.map