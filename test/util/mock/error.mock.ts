export class ErrorMock {
  static get database() {
    return {
      message: 'A database error occurs, please try again later',
    };
  }
}
