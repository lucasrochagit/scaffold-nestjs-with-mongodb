import { HttpStatus } from '@nestjs/common';

export function validateNotFoundException(err: any, message: string) {
  expect(err).toHaveProperty('response');
  expect(err.response).toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
  expect(err.response).toHaveProperty('message', message);
  expect(err.response).toHaveProperty('error', 'Not Found');
}
