const { User } = require('../models');

const sampleUser = [{
        username: 'mike',
        password: '1234'

    },
    {
        username: 'rob',
        password: '0000'

    },
    {
        username: 'joe',
        password: '4321'

    },
];

const userSeeds = () => User.bulkCreate(sampleUser);

module.exports = userSeeds;