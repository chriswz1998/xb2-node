"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const post_service_1 = require("./post.service");
const index = (req, res, next) => {
    if (req.headers.authorization !== 'asa') {
        return next(new Error());
    }
    res.send((0, post_service_1.getPosts)());
};
exports.index = index;
//# sourceMappingURL=post.controller.js.map