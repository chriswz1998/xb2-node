export const sqlFragment = {
    user: `JSON_OBJECT(
            'userId', user.id,
            'name', user.name
        ) AS user`,
    leftJoinUser: ` LEFT JOIN user
            ON user.id = post.userId`,
    totalComments: `
        (
            SELECT COUNT(\`comment\`.id)
            FROM \`comment\`
            WHERE \`comment\`.postId = post.id
        ) as totalComment
    `,
    leftJoinOneFile: `
        LEFT JOIN LATERAL (
            SELECT * FROM file
            WHERE file.postId = post.id
            ORDER BY file.id DESC
            LIMIT 1
        ) AS file ON post.id = file.postId
    `,
    file: `
        CAST(
            IF(
                COUNT(file.id),
                     GROUP_CONCAT(
                        DISTINCT JSON_OBJECT(
                            'id', file.id,
                            'width', file.width,
                            'height', file.height
                        )
                    ),
            NULL
            ) AS JSON
        ) as file
    `,
    leftJoinTag: `
        left join
            post_tag on post_tag.postId = post.id
        left join
            tag on post_tag.tagId = tag.id
    `,
    tags: `
        cast(
           if(
                count(tag.id),
                concat(
                    '[',
                        group_concat(
                            distinct json_object(
                                'id', tag.id,
                                'name', tag.name
                            )
                        ),
                     ']'
                ),
                null
           ) as json
        ) as tags
    `
}
