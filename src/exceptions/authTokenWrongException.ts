import HttpException from "../interfaces/httpException"

class AuthWrongTokenException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 401;
    this.message = 'Access denied, Not authorized';
  }
}

export default AuthWrongTokenException;

