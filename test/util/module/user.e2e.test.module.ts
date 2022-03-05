import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../src/user/user.schema';
import { UserService } from '../../../src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserController } from '../../../src/user/user.controller';

export async function bootstrap(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.TEST_DATABASE_URL),
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  return app;
}
