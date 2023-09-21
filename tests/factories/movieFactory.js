const { faker } = require('@faker-js/faker');
const Movie = require('../../models/movie');
const { Factory } = require('./factory');
const { UserFactory } = require('./userFactory');

module.exports.MovieFactory = class MovieFactory extends Factory {
  // eslint-disable-next-line
  getDefinition() {
    return {
      country: faker.location.country(),
      director: faker.person.fullName(),
      duration: faker.number.int(),
      year: new Date().getFullYear(),
      description: faker.lorem.text(),
      image: faker.image.avatar(),
      trailerLink: faker.internet.url(),
      thumbnail: faker.internet.url(),
      movieId: faker.number.int(),
      nameRU: faker.lorem.words(5),
      nameEN: faker.lorem.words(5),
      // owner: async () => {
      //   const user = await new UserFactory().createOne();
      //   return user._id;
      // },
    };
  }

  // eslint-disable-next-line
  getModel() {
    return Movie;
  }
};
