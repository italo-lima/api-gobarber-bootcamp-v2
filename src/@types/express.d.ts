declare namespace Express {
  export interface Request {
    //vai adicionar user denro da Request
    user: {
      id: string;
    };
  }
}
