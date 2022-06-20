"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = async (request, response, next) => {
    const { name, password } = request.body;
    response.send({ message: `欢迎回来，${name}` });
};
exports.login = login;
//# sourceMappingURL=auth.conntroller.js.map