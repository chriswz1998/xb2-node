"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const mysql_1 = require("../app/database/mysql");
const getPosts = async () => {
    const statement = `
        SELECT 
            post.id, 
            post.title, 
            post.content, 
        JSON_OBJECT(
            'id', user.id,
            'name', user.name
        ) AS user
        FROM post
        LEFT JOIN user
            ON user.id = post.id
    `;
    const [data] = await mysql_1.connection.promise().query(statement);
    return data;
};
exports.getPosts = getPosts;
const createPost = async (post) => {
    const statement = `
        insert into post
        set ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, post);
    return data;
};
exports.createPost = createPost;
const updatePost = async (postId, post) => {
    const statement = `
        update post
        set ?
        where id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, [post, postId]);
    return data;
};
exports.updatePost = updatePost;
const deletePost = async (postId) => {
    const statement = `
        delete from post
        where id = ?
    `;
    const [data] = await mysql_1.connection.promise().query(statement, postId);
    return data;
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map