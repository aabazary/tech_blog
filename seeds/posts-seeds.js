const { Post } = require('../models');

const samplePosts = [{
        title: 'Descriptive Post 1',
        content: 'Some Descriptive Post',
        user_id: 1

    },
    {
        title: 'Descriptive Post 2',
        content: 'Another Descriptive Post',
        user_id: 2
    },
    {
        title: 'Descriptive Post 3',
        content: 'Yet Another Descriptive Post',
        user_id: 3
    }
];

const postSeeds = () => Post.bulkCreate(samplePosts);

module.exports = postSeeds;