const { Comment } = require('../models');

const sampleComment = [{
       body: 'boom goes the dynamite'

    },
    {
        body: 'wam bam shamalam and a shalala'

    },
    {
        body:'Wehadababyitsaboy'

    }
];

const commentSeeds = () => Comment.bulkCreate(sampleComment);

module.exports = commentSeeds;