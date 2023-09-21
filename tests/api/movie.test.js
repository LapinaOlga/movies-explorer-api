const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../app');
const Movie = require('../../models/movie');
const { getAuthToken } = require('../../utils/getAuthToken');
const {
  HTTP_OK,
  HTTP_FORBIDDEN,
  HTTP_UNAUTHORIZED,
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
} = require('../../enums/httpCodes');
const { UserFactory } = require('../factories/userFactory');
const { MovieFactory } = require('../factories/movieFactory');

describe('GET /movies', () => {
  // let user, movie;

  test('Unauthorized', async () => {
    // act
    const response = await request(app)
      .get('/movies')
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Success', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    await new MovieFactory().createOne({ owner: user._id });

    // act
    const response = await request(app)
      .get('/movies')
      .set('authorization', `Bearer ${getAuthToken(user)}`);

    // assert
    expect(response.statusCode).toBe(HTTP_OK);

    expect(typeof response.body).toBe('object');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length >= 1).toBe(true);

    for (let i = 0; i < response.body.data.length; i += 1) {
      const item = response.body.data[i];
      expect(typeof item).toBe('object');
      expect(typeof item._id).toBe('string');
      expect(typeof item.country).toBe('string');
      expect(typeof item.description).toBe('string');
      expect(typeof item.director).toBe('string');
      expect(typeof item.duration).toBe('number');
      expect(typeof item.image).toBe('string');
      expect(typeof item.movieId).toBe('number');
      expect(typeof item.nameEN).toBe('string');
      expect(typeof item.nameRU).toBe('string');
      expect(typeof item.owner).toBe('object');
      expect(item.owner).not.toBeNull();
      expect(typeof item.owner._id).toBe('string');
      expect(typeof item.owner.name).toBe('string');
      expect(typeof item.owner.email).toBe('string');
    }
  });
});

describe('POST /movies', () => {
  test('Unauthorized', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    const movieData = await new MovieFactory().makeOne({ owner: user._id });

    // act
    const response = await request(app)
      .post('/movies')
      .send(movieData);

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Success', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    const movieData = await new MovieFactory().makeOne({ owner: user._id });

    // act
    const response = await request(app)
      .post('/movies')
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send(movieData);

    // assert
    expect(response.statusCode).toBe(HTTP_CREATED);

    expect(typeof response.body).toBe('object');
    expect(typeof response.body.data).toBe('object');
    expect(typeof response.body.data._id).toBe('string');

    expect(response.body.data).toMatchObject({
      ...movieData,
      owner: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  });

  test('Validation Error', async () => {
    const dataProvider = [
      { country: faker.number.int() },
      { country: true },
      { director: faker.number.int() },
      { duration: faker.string.uuid() },
      { year: 1800 },
      { year: 3000 },
      { description: faker.number.int() },
      { image: faker.string.uuid() },
      { image: faker.number.int() },
      { trailerLink: faker.string.uuid() },
      { trailerLink: faker.number.int() },
      { thumbnail: faker.string.uuid() },
      { thumbnail: faker.number.int() },
      { movieId: faker.string.uuid() },
      { nameRU: faker.number.int() },
      { nameEN: faker.number.int() },
    ];

    // arrange
    const user = await new UserFactory().createOne();
    const authToken = getAuthToken(user);

    dataProvider.map(async (data) => {
      // arrange
      const movieData = await new MovieFactory().makeOne(data);

      // act
      const response = await request(app)
        .post('/movies')
        .set('authorization', `Bearer ${authToken}`)
        .send(movieData);

      // assert
      expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
    });
  });
});

describe('DELETE /movies/:id', () => {
  test('Unauthorized', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    const movie = await new MovieFactory().createOne({
      owner: user._id,
    });

    // act
    const response = await request(app)
      .delete(`/movies/${movie._id}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Deleting not your own movie', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    const otherUser = await new UserFactory().createOne();
    const movie = await new MovieFactory().createOne({
      owner: otherUser._id,
    });

    // act
    const response = await request(app)
      .delete(`/movies/${movie._id}`)
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_FORBIDDEN);
  });

  test('Not found', async () => {
    // arrange
    const user = await new UserFactory().createOne();

    // act
    const response = await request(app)
      .delete(`/movies/${user._id}`)
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_NOT_FOUND);
  });

  test('Incorrect id format', async () => {
    // arrange
    const user = await new UserFactory().createOne();

    // act
    const response = await request(app)
      .delete('/movies/123')
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
  });

  test('Success', async () => {
    // arrange
    const user = await new UserFactory().createOne();
    let movie = await new MovieFactory().createOne({ owner: user._id });

    // act
    const response = await request(app)
      .delete(`/movies/${movie._id}`)
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_OK);
    expect(response.body).toStrictEqual({ data: null });

    movie = await Movie.findById(movie.id);
    expect(movie).toBe(null);
  });
});
