export class UserMock {
  static get dto() {
    return {
      name: 'John Doe',
      age: 21,
    };
  }

  static get model() {
    return {
      _id: '6223cf8a2fb73b2e841a6595',
      name: 'John Doe',
      age: 21,
      created_at: '2022-03-05T21:00:28.221Z',
      updated_at: '2022-03-05T21:00:28.221Z',
    };
  }
}
