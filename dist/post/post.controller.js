"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.store = exports.index = void 0;
const lodash_1 = __importDefault(require("lodash"));
const post_service_1 = require("./post.service");
const index = async (req, res, next) => {
    try {
        const posts = await (0, post_service_1.getPosts)();
        res.send(posts);
    }
    catch (e) {
        next(e);
    }
};
exports.index = index;
const store = async (req, res, next) => {
    const { title, content } = req.body;
    const { id: userId } = req.user;
    try {
        const data = await (0, post_service_1.createPost)({ title, content, userId });
        res.status(201).send(data);
    }
    catch (e) {
        next(e);
    }
};
exports.store = store;
const update = async (req, res, next) => {
    const { postId } = req.params;
    const post = lodash_1.default.pick(req.body, ['title', 'content']);
    try {
        const data = await (0, post_service_1.updatePost)(parseInt(postId, 10), post);
        res.send(data);
    }
    catch (e) {
        next(e);
    }
};
exports.update = update;
const destroy = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const data = await (0, post_service_1.deletePost)(parseInt(postId, 10));
        res.send(data);
    }
    catch (e) {
        next(e);
    }
};
exports.destroy = destroy;
//# sourceMappingURL=post.controller.js.map