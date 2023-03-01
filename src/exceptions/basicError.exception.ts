import HttpException from "../interfaces/httpException.interface"

class BasicErrorException implements HttpException {
  status : number;
  message: string;

  constructor() {
    this.status  = 400;
    this.message = 'Something goes wrong, please try again.';
  }
}

export default BasicErrorException;