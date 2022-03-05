import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  return moduleFixture.createNestApplication();
}
