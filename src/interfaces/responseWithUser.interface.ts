import { Response } from "express";
import UserOnline from "../entity/userOnline.entity";

interface ResponseWithUser extends Response {
  user: UserOnline | any,
}

export default ResponseWithUser;