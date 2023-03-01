import HttpException from "../interfaces/httpException.interface"

class AuthCredentialInvalidException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 400;
    this.message = 'Invalid Credentials';
  }
}

export default AuthCredentialInvalidException;

