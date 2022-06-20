"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = exports.requestUrl = void 0;
const requestUrl = (req, res, next) => {
    console.log(req.url);
    next();
};
exports.requestUrl = requestUrl;
const defaultErrorHandler = (error, request, response, next) => {
    if (error.message)
        console.log('🚧', error.message);
    let statusCode, message;
    switch (error.message) {
        case 'NAME_IS_REQUIRED':
            statusCode = 400;
            message = '请提供用户名';
            break;
        case 'PASSWORD_IS_REQUIRED':
            statusCode = 400;
            message = '请提供密码';
            break;
        case 'USER_ALREADY_EXIT':
            statusCode = 409;
            message = '用户名已存在';
            break;
        case 'USER_DOES_NOT_EXIT':
            statusCode = 400;
            message = '用户不存在';
            break;
        case 'PASSWORD_DOES_NOT_MATCH':
            statusCode = 400;
            message = '密码错误';
            break;
        default:
            statusCode = 500;
            message = '服务器暂时出了点小问题～～😄';
            break;
    }
    response.status(statusCode).send(message);
};
exports.defaultErrorHandler = defaultErrorHandler;
//# sourceMappingURL=app.middleware.js.map