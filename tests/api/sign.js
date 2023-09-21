const request = require('supertest');
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const User = require('../../models/user');
const {
  HTTP_OK,
  HTTP_UNAUTHORIZED,
  HTTP_BAD_REQUEST, HTTP_CONFLICT, HTTP_CREATED,
} = require('../../enums/httpCodes');
const { UserFactory } = require('../factories/userFactory');
const { encryptPassword } = require('../../utils/encryptPassword');

describe('POST /signin', () => {
  test('Validation Error', async () => {
    const dataProvider = [
      { email: faker.lorem.word(), password: faker.string.uuid() },
      { email: undefined, password: faker.string.uuid() },
      { email: faker.number.int(), password: faker.string.uuid() },
      { email: faker.internet.email(), password: '123' },
      { email: faker.internet.email(), password: undefined },
      { email: faker.internet.email(), password: faker.number.int() },
    ];

    dataProvider.map(async (data) => {
      // act
      const response = await request(app)
        .post('/signin')
        .send(data);

      // assert
      expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
    });
  });

  test('Not correct password', async () => {
    // arrange
    const password = faker.string.uuid();
    const user = await new UserFactory().createOne();

    // act
    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password,
      });

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('User is undefined', async () => {
    // arrange
    const password = faker.string.uuid();

    // act
    const response = await request(app)
      .post('/signin')
      .send({
        email: faker.internet.email(),
        password,
      });

    // assert
    expect(response.statusCode).toBe(HTTP_UNAUTHORIZED);
  });

  test('Success', async () => {
    // arrange
    const password = faker.string.uuid();
    const user = await new UserFactory().createOne({
      password: encryptPassword(password),
    });

    // act
    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password,
      });

    // assert
    expect(response.statusCode).toBe(HTTP_OK);
    expect(typeof response.body.data).toBe('object');
    expect(typeof response.body.data.token).toBe('string');

    const payload = jwt.verify(response.body.data.token, process.env.JWT_SECRET);
    expect(payload._id).toBe(user._id.toString());
  });
});

describe('POST /signup', () => {
  test('Bad Request', async () => {
    const dataProvider = [
      { email: faker.string.uuid(), password: faker.string.uuid(), name: faker.person.fullName() },
      { email: faker.internet.email(), password: '123', name: faker.person.fullName() },
      { email: faker.internet.email(), password: faker.string.uuid(), name: '1' },
      { email: faker.internet.email(), password: faker.string.uuid(), name: faker.number.int() },
      { email: faker.internet.email(), password: faker.string.uuid(), name: faker.string.uuid() },
    ];

    dataProvider.map(async (data) => {
      // act
      const response = await request(app)
        .post('/signup')
        .send(data);

      // assert
      expect(response.statusCode).toBe(HTTP_BAD_REQUEST);
    });
  });

  test('User exists', async () => {
    // arrange
    const user = await new UserFactory().createOne();

    // act
    const response = await request(app)
      .post('/signup')
      .send({
        email: user.email,
        password: faker.string.uuid(),
        name: faker.person.fullName(),
      });

    // assert
    expect(response.statusCode).toBe(HTTP_CONFLICT);
  });

  test('Success', async () => {
    // arrange
    const fakeUser = await new UserFactory().makeOne();

    // act
    const response = await request(app)
      .post('/signup')
      .send({
        email: fakeUser.email,
        password: fakeUser.password,
        name: fakeUser.name,
      });

    // assert
    expect(response.statusCode).toBe(HTTP_CREATED);

    const user = await User.findOne({ email: fakeUser.email });

    expect(user.email).toBe(fakeUser.email);
    expect(user.name).toBe(fakeUser.name);
  });
});
