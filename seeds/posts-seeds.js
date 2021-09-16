const { Post } = require('../models');

const samplePosts = [{
        title: 'Descriptive Post 1',
        contents: 'Some Descriptive Post',
        user_id: 1

    },
    {
        title: 'Descriptive Post 2',
        contents: 'Another Descriptive Post',
        user_id: 2
    },
    {
        title: 'Descriptive Post 3',
        contents: 'Yet Another Descriptive Post',
        user_id: 3
    }
];

const postSeeds = () => Post.bulkCreate(samplePosts);

module.exports = postSeeds;