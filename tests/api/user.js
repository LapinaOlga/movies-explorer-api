const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../app');
const User = require('../../models/user');
const { getAuthToken } = require('../../utils/getAuthToken');
const {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_BAD_REQUEST,
} = require('../../enums/httpCodes');
const { UserFactory } = require('../factories/userFactory');

describe('GET /users/me', () => {
  test('Unauthorized', async () => {
    // act
    const response = await request(app)
      .get('/users/me')
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Success', async () => {
    // arrange
    const user = await new UserFactory().createOne();

    // act
    const response = await request(app)
      .get('/users/me')
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send();

    // assert
    expect(response.statusCode).toBe(HTTP_OK);
    expect(response.body.data).toStrictEqual({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  });
});

describe('PATCH /users/me', () => {
  test('Unauthorized', async () => {
    // assert
    const fakeUser = await new UserFactory().makeOne();

    // act
    const response = await request(app)
      .patch('/users/me')
      .send({
        name: fakeUser.name,
        email: fakeUser.email,
      });

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Bad Request', async () => {
    const fakeUser = await new UserFactory().makeOne();
    const dataProvider = [
      { name: fakeUser.name },
      { email: fakeUser.email },
      {},
    ];

    // arrange
    const user = await new UserFactory().createOne();

    dataProvider.map(async (data) => {
      // act
      const response = await request(app)
        .patch('/users/me')
        .set('authorization', `Bearer ${getAuthToken(user)}`)
        .send(data);

      // assert
      expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
    });
  });

  test('Validation Error', async () => {
    const dataProvider = [
      { name: '1', email: faker.internet.email() },
      { name: faker.lorem.words(50), email: faker.internet.email() },
      { name: undefined, email: faker.internet.email() },
      { name: faker.number.int(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.string.uuid() },
      { name: faker.person.fullName(), email: undefined },
      { name: faker.person.fullName(), email: faker.number.int() },
    ];

    // arrange
    const user = await new UserFactory().createOne();

    dataProvider.map(async (data) => {
      // act
      const response = await request(app)
        .patch('/users/me')
        .set('authorization', `Bearer ${getAuthToken(user)}`)
        .send(data);

      // assert
      expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
    });
  });

  test('Success', async () => {
    // arrange
    let user = await new UserFactory().createOne();
    const fakeUser = await new UserFactory().makeOne();

    // act
    const response = await request(app)
      .patch('/users/me')
      .set('authorization', `Bearer ${getAuthToken(user)}`)
      .send({ name: fakeUser.name, email: fakeUser.email });

    // assert
    expect(response.statusCode).toBe(HTTP_OK);
    expect(response.body.data.name).toBe(fakeUser.name);

    user = await User.findById(user._id);

    expect(user.name).toBe(fakeUser.name);
  });
});
