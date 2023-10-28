const { faker } = require('@faker-js/faker');
const User = require('../../models/user');
const { Factory } = require('./factory');

module.exports.UserFactory = class UserFactory extends Factory {
  // eslint-disable-next-line
  getDefinition() {
    return {
      email: faker.internet.email(),
      password: faker.string.uuid(),
      name: faker.person.fullName(),
    };
  }

  // eslint-disable-next-line
  getModel() {
    return User;
  }
};
