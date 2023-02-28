import HttpException from "../interfaces/httpException"

class AuthCredentialWrongException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 400;
    this.message = 'Wrong Email/Password';
  }
}

export default AuthCredentialWrongException;

