export {};

declare global {
  namespace Express {
    interface Response {
      data: any;
    }
  }
}
