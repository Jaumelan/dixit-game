class ExceptionTreatment {
  public constructor(error: Error, status = 500, message = 'unexpected error') {
    const [statusCode] = error.message.split(': ');

    if (Number(statusCode)) {
      throw error;
    } else {
      throw new Error(`${status}: ${message}`);
    }
  }
}

export { ExceptionTreatment };
