export class SchemaMock {
  static asSuccessBuilderCall(calls: string[], resolves: unknown) {
    if (!calls.length) return;
    return this.mockBuilderCall(
      calls,
      jest.fn().mockResolvedValueOnce(resolves),
    );
  }

  static asErrorBuilderCall(calls: string[], reject: unknown) {
    if (!calls.length) return;
    return this.mockBuilderCall(calls, jest.fn().mockRejectedValueOnce(reject));
  }

  private static mockBuilderCall(
    list: string[],
    mockReturn: jest.Mock,
    index = 0,
  ) {
    if (index === list.length) {
      return mockReturn;
    }

    return jest.fn().mockImplementationOnce(() => ({
      [list[index]]: this.mockBuilderCall(list, mockReturn, index + 1),
    }));
  }
}
