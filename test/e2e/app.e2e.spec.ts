import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../util/module/app.e2e.test.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return Hello World!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });
});
