import { Response } from "express";
import User from "../entity/user";

interface ResponseWithUser extends Response {
  user: User | any,
}

export default ResponseWithUser;