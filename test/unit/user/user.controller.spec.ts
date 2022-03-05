import { UserController } from '../../../src/user/user.controller';
import { mock } from 'sinon';
import { UserMock } from '../../util/mock/user.mock';
import { ErrorMock } from '../../util/mock/error.mock';
import { QueryMock } from '../../util/mock/query.mock';
import { validateNotFoundException } from '../../util/exception/validate.application.exception';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: any;

  beforeEach(async () => {
    service = mock();
    controller = new UserController(service);
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created user', async () => {
        service.create = jest.fn().mockResolvedValueOnce(UserMock.model);

        const result = await controller.create(UserMock.dto);
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when an error occurs', () => {
      it('should throw the error', async () => {
        service.create = jest.fn().mockRejectedValueOnce(ErrorMock.database);

        try {
          await controller.create(UserMock.dto);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of users', async () => {
        service.find = jest.fn().mockResolvedValueOnce([UserMock.model]);

        const result = await controller.find(QueryMock.default);
        expect(result).toMatchObject([UserMock.model]);
      });
    });

    describe('when an error occurs', () => {
      it('should throw the error', async () => {
        service.find = service.find = jest
          .fn()
          .mockRejectedValueOnce(ErrorMock.database);

        try {
          await controller.find(QueryMock.default);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('findById()', () => {
    describe('when findById is successful', () => {
      it('should return the founded user', async () => {
        service.findById = jest.fn().mockResolvedValueOnce(UserMock.model);

        const result = await controller.findById(
          { user_id: UserMock.model._id },
          QueryMock.default,
        );
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        service.findById = jest
          .fn()
          .mockRejectedValueOnce(
            new NotFoundException('User not found or already removed'),
          );

        try {
          await controller.findById(
            { user_id: UserMock.model._id },
            QueryMock.default,
          );
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when an error occurs', () => {
      it('should throw the error', async () => {
        service.findById = jest.fn().mockRejectedValueOnce(ErrorMock.database);

        try {
          await controller.findById(
            { user_id: UserMock.model._id },
            QueryMock.default,
          );
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('updateById()', () => {
    describe('when updateById is successful', () => {
      it('should return the updated user', async () => {
        service.updateById = jest.fn().mockResolvedValueOnce(UserMock.model);

        const result = await controller.updateById(
          { user_id: UserMock.model._id },
          UserMock.dto,
          QueryMock.default,
        );
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        service.updateById = jest
          .fn()
          .mockRejectedValueOnce(
            new NotFoundException('User not found or already removed'),
          );

        try {
          await controller.updateById(
            { user_id: UserMock.model._id },
            UserMock.dto,
            QueryMock.default,
          );
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when an error occurs', () => {
      it('should throw the error', async () => {
        service.updateById = jest
          .fn()
          .mockRejectedValueOnce(ErrorMock.database);

        try {
          await controller.updateById(
            { user_id: UserMock.model._id },
            UserMock.dto,
            QueryMock.default,
          );
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('deleteById()', () => {
    describe('when deleteById is successful', () => {
      it('should return undefined', async () => {
        service.deleteById = jest.fn().mockResolvedValueOnce(UserMock.model);

        const result = await controller.deleteById({
          user_id: UserMock.model._id,
        });
        expect(result).toBeUndefined();
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        service.deleteById = jest
          .fn()
          .mockRejectedValueOnce(
            new NotFoundException('User not found or already removed'),
          );

        try {
          await controller.deleteById({ user_id: UserMock.model._id });
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        service.deleteById = jest
          .fn()
          .mockRejectedValueOnce(ErrorMock.database);

        try {
          await controller.deleteById({ user_id: UserMock.model._id });
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });
});
