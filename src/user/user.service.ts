import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User, UserDocument } from './user.schema';
import { MongoQueryModel } from 'nest-mongo-query-parser';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly _model: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDTO) {
    return this._model.create(dto);
  }

  async find(query: MongoQueryModel) {
    return this._model
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .select(query.select)
      .exec();
  }

  async findById(_id: string, query: MongoQueryModel) {
    const result = await this._model
      .findOne({ _id })
      .select(query.select)
      .exec();

    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }

    return result;
  }

  async updateById(_id: string, dto: UpdateUserDTO, query: MongoQueryModel) {
    const result = await this._model
      .findOneAndUpdate({ _id }, dto, {
        new: true,
      })
      .select(query.select)
      .exec();

    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }

    return result;
  }

  async deleteById(_id: string) {
    const result = await this._model.findByIdAndDelete(_id);
    if (!result) {
      throw new NotFoundException('User not found or already removed');
    }
  }
}
