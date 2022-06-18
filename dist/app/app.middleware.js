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
        default:
            statusCode = 500;
            message = '服务器暂时出了点小问题～～😄';
            break;
    }
    response.status(statusCode).send(message);
};
exports.defaultErrorHandler = defaultErrorHandler;
//# sourceMappingURL=app.middleware.js.map