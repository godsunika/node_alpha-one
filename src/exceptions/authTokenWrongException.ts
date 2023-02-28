import HttpException from "../interfaces/httpException"

class authTokenWrongException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 401;
    this.message = 'Access denied, Not authorized';
  }
}

export default authTokenWrongException;

