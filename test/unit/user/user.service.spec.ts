import { UserService } from '../../../src/user/user.service';
import { UserMock } from '../../util/mock/user.mock';
import { mock } from 'sinon';
import { ErrorMock } from '../../util/mock/error.mock';
import { QueryMock } from '../../util/mock/query.mock';
import { SchemaMock } from '../../util/mock/schema.mock';
import { validateNotFoundException } from '../../util/exception/validate.application.exception';

describe('UserService', () => {
  let model: any;
  let service: UserService;

  beforeEach(async () => {
    model = mock();
    service = new UserService(model);
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created user', async () => {
        model.create = jest.fn().mockResolvedValueOnce(UserMock.model);

        const result = await service.create(UserMock.dto);
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        model.create = jest.fn().mockRejectedValueOnce(ErrorMock.database);

        try {
          await service.create(UserMock.dto);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('find()', () => {
    const calls = ['limit', 'skip', 'sort', 'select', 'exec'];

    describe('when find is successful', () => {
      it('should return a list of users', async () => {
        model.find = SchemaMock.asSuccessBuilderCall(calls, [UserMock.model]);

        const result = await service.find(QueryMock.default);
        expect(result).toMatchObject([UserMock.model]);
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        model.find = SchemaMock.asErrorBuilderCall(calls, ErrorMock.database);

        try {
          await service.find(QueryMock.default);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('findById()', () => {
    const calls = ['select', 'exec'];

    describe('when findById is successful', () => {
      it('should return the founded user', async () => {
        model.findOne = SchemaMock.asSuccessBuilderCall(calls, UserMock.model);

        const result = await service.findById(
          UserMock.model._id,
          QueryMock.default,
        );
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        model.findOne = SchemaMock.asSuccessBuilderCall(calls, null);

        try {
          await service.findById(UserMock.model._id, QueryMock.default);
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        model.findOne = SchemaMock.asErrorBuilderCall(
          calls,
          ErrorMock.database,
        );

        try {
          await service.findById(UserMock.model._id, QueryMock.default);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });

  describe('updateById()', () => {
    const calls = ['select', 'exec'];

    describe('when updateById is successful', () => {
      it('should return the updated user', async () => {
        model.findOneAndUpdate = SchemaMock.asSuccessBuilderCall(
          calls,
          UserMock.model,
        );

        const result = await service.updateById(
          UserMock.model._id,
          UserMock.dto,
          QueryMock.default,
        );
        expect(result).toMatchObject(UserMock.model);
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        model.findOneAndUpdate = SchemaMock.asSuccessBuilderCall(calls, null);

        try {
          await service.updateById(
            UserMock.model._id,
            UserMock.dto,
            QueryMock.default,
          );
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        model.findOneAndUpdate = SchemaMock.asErrorBuilderCall(
          calls,
          ErrorMock.database,
        );

        try {
          await service.updateById(
            UserMock.model._id,
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
        model.findByIdAndDelete = jest
          .fn()
          .mockResolvedValueOnce(UserMock.model);

        const result = await service.deleteById(UserMock.model._id);
        expect(result).toBeUndefined();
      });
    });

    describe('when user is not founded', () => {
      it('should throw a not found exception', async () => {
        model.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.deleteById(UserMock.model._id);
        } catch (err) {
          validateNotFoundException(err, 'User not found or already removed');
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should throw the error', async () => {
        model.findByIdAndDelete = jest
          .fn()
          .mockRejectedValueOnce(ErrorMock.database);

        try {
          await service.deleteById(UserMock.model._id);
        } catch (err) {
          expect(err).toMatchObject(ErrorMock.database);
        }
      });
    });
  });
});
