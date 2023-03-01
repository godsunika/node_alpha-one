import HttpException from "../interfaces/httpException.interface"

class AuthTokenInvalidException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 401;
    this.message = 'Invalid Auth Token';
  }
}

export default AuthTokenInvalidException;

