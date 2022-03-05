export class QueryMock {
  static get default() {
    return {
      limit: 100,
      skip: 0,
      select: {},
      sort: {},
      populate: [],
      filter: {},
    };
  }
}
