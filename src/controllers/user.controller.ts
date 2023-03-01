import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

import AuthCredentialWrongException from '../exceptions/authCredentialWrong.exception';
import AuthCredentialInvalidException from '../exceptions/authCredentialInvalid.exception';
import User from '../entity/user.entity';
import BasicErrorException from '../exceptions/basicError.exception';


const prisma = new PrismaClient();

export const signUpHandler = async (req: Request, res: Response) => {

  try {
    const schema = Joi.object({
      name    : Joi.string().min(3).max(30).required(),
      email   : Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      const { status, message } = new AuthCredentialWrongException();
      return res.status(status).send(message);
    }

    // let user: Partial<User> | any = true;
    // await User.findOne({ email: req.body.email });

    const checkUser = await prisma.users.findUnique({
      where: {
        username: 'fuckoff',
      },
    })

    if (checkUser) {
      const { status, message } = new AuthCredentialInvalidException();
      return res.status(status).send("User already exists...");
    }

    const { username, name, sex, email, password } = req.body;

    // const user = {
    //   username: username,
    //   name    : name,
    //   sex     : sex,
    //   email   : email,
    //   password: password,
    // }

    const salt            = await bcryptjs.genSalt(10);
    const encryptPassword = await bcryptjs.hash(password, salt);

    const user = await prisma.users.create({
      data: {
        uid       : 'asdasdasdad',
        username  : username,
        name      : name,
        sex       : sex,
        email     : email,
        password  : encryptPassword,
        created_at: '2022-01-21 10:00:00',
        updated_at: '2022-01-21 10:00:00',
        created_by: 1,
        updated_by: 1,
      },
    })

    res.send(user);

  } catch (error) {
    let { status, message } = new BasicErrorException();
    res.status(status).send(message);
  }
}