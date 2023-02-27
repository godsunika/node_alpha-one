import jwt from "jsonwebtoken";
import { config as dotenv } from "dotenv";
import { Request, Response, NextFunction } from "express";
import AuthWrongTokenException from "../exceptions/authTokenWrongException";
import ResponseWithUser from "../interfaces/responseWithUser";
import AuthTokenInvalidException from "../exceptions/authTokenInvalidException";

dotenv();

function auth(req: Request, res: ResponseWithUser, next: NextFunction) {

  const token = req.header("x-auth-token");

  const { status, message } = new AuthWrongTokenException();
  if (!token) return res.status(status).send(message);

  try {
    const jwtSecretKey: jwt.Secret = process.env.JWT_SECRET_KEY || "s0m3wh3r3";
    const decoded                  = jwt.verify(token, jwtSecretKey);
    res.user                       = decoded;

    next();
  } catch (error) {
    const { status, message } = new AuthTokenInvalidException();

    res.status(status).send(message);
  }

}

export default auth;