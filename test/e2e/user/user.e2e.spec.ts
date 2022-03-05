import { HttpStatus, INestApplication } from '@nestjs/common';
import * as Request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { bootstrap } from '../../util/module/user.e2e.test.module';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../src/user/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UserMock } from '../../util/mock/user.mock';
import {
  validateBadRequestDTOBody,
  validateNotFoundBody,
} from '../../util/exception/validate.response.exception';
import { getId } from 'json-generator';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let request: SuperTest<Test>;
  let model: Model<UserDocument>;
  let savedUser: any;

  beforeAll(async () => {
    app = await bootstrap();
    await app.init();
    request = Request(app.getHttpServer());
    model = app.get(getModelToken(User.name));
  });

  afterAll(async () => {
    await Promise.all([app.close(), model.deleteMany({})]);
  });

  describe('POST /users', () => {
    describe('when request is successful', () => {
      it('should return the created user', async () => {
        const response = await request
          .post('/users')
          .send(UserMock.dto)
          .expect(HttpStatus.CREATED);

        validateSuccessBody(response.body);
        savedUser = response.body;
      });
    });

    describe('when validation error occurs', () => {
      it('should return BadRequestException for missing required params', async () => {
        const response = await request
          .post('/users')
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'name should not be null or undefined',
          'age should not be null or undefined',
        ]);
      });
      it('should return BadRequestException for invalid required params', async () => {
        const response = await request
          .post('/users')
          .send({ name: 'WR0ng N@me._', age: '12' })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'name must contains letters and a single space between words',
          'age must be an integer number',
        ]);
      });
    });
  });

  describe('GET /users', () => {
    describe('when request is successful', () => {
      it('should return a list of users', async () => {
        const response = await request.get('/users').expect(HttpStatus.OK);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(1);
        validateSuccessBody(response.body[0]);
      });

      it('should return an empty list for no matching query', async () => {
        const response = await request
          .get('/users?name=random')
          .expect(HttpStatus.OK);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(0);
      });
    });
  });

  describe('GET /users/:user_id', () => {
    describe('when request is successful', () => {
      it('should return the founded user', async () => {
        const response = await request
          .get(`/users/${savedUser._id}`)
          .expect(HttpStatus.OK);

        validateSuccessBody(response.body);
      });
    });

    describe('when the user is not founded', () => {
      it('should return NotFoundException', async () => {
        const response = await request
          .get(`/users/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);

        validateNotFoundBody(
          response.body,
          'User not found or already removed',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return BadRequestException for invalid id format', async () => {
        const response = await request
          .get(`/users/123`)
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'user_id must be a mongodb id',
        ]);
      });
    });
  });

  describe('PUT /users/:user_id', () => {
    describe('when request is successful', () => {
      it('should return the updated user', async () => {
        const response = await request
          .put(`/users/${savedUser._id}`)
          .send({ name: 'John Doe Jr', age: 18 })
          .expect(HttpStatus.OK);

        validateSuccessBody(response.body);
      });
    });

    describe('when the user is not founded', () => {
      it('should return NotFoundException', async () => {
        const response = await request
          .put(`/users/${getId('objectId')}`)
          .send({ name: 'John Doe Jr', age: 18 })
          .expect(HttpStatus.NOT_FOUND);

        validateNotFoundBody(
          response.body,
          'User not found or already removed',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return BadRequestException for invalid id format', async () => {
        const response = await request
          .put(`/users/123`)
          .send({ name: 'John Doe Jr', age: 18 })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'user_id must be a mongodb id',
        ]);
      });
      it('should return BadRequestException for invalid params', async () => {
        const response = await request
          .put(`/users/${savedUser._id}`)
          .send({ name: 'WR0ng N@me._', age: '12' })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'name must contains letters and a single space between words',
          'age must be an integer number',
        ]);
      });
    });
  });

  describe('DELETE /users/:user_id', () => {
    describe('when request is successful', () => {
      it('should return no content', async () => {
        const response = await request
          .delete(`/users/${savedUser._id}`)
          .expect(HttpStatus.NO_CONTENT);

        expect(response.body).toMatchObject({});
      });
    });

    describe('when the user is not founded', () => {
      it('should return NotFoundException', async () => {
        const response = await request
          .delete(`/users/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);

        validateNotFoundBody(
          response.body,
          'User not found or already removed',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return BadRequestException for invalid id format', async () => {
        const response = await request
          .delete(`/users/123`)
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'user_id must be a mongodb id',
        ]);
      });
    });
  });

  const validateSuccessBody = (body: any) => {
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('age');
    expect(body).toHaveProperty('created_at');
    expect(body).toHaveProperty('updated_at');
  };
});
