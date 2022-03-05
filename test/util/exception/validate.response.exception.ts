import { HttpStatus } from '@nestjs/common';

export function validateNotFoundBody(body: any, message: string) {
  expect(body).toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
  expect(body).toHaveProperty('message', message);
  expect(body).toHaveProperty('error', 'Not Found');
}

export function validateBadRequestDTOBody(body: any, messages: string[]) {
  expect(body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
  expect(body).toHaveProperty('message');
  messages.forEach((message) => {
    expect(body.message).toContainEqual(message);
  });
  expect(body).toHaveProperty('error', 'Bad Request');
}
