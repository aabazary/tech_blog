const sequelize = require('../config/connection');

const userSeeds = require('./users-seeds');
const postSeeds = require('./posts-seeds');
const commentSeeds = require('./comments-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userSeeds();
  await postSeeds();
  await commentSeeds();

  process.exit(0);
};

seedDatabase();
