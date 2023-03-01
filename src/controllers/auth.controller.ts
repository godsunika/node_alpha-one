import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { Request, Response } from "express";

import AuthCredentialInvalidException from '../exceptions/authCredentialInvalid.exception';
import AuthCredentialWrongException from '../exceptions/authCredentialWrong.exception';
import UserOnline from '../entity/userOnline.entity';
import User from '../entity/user.entity';
import BasicErrorException from '../exceptions/basicError.exception';

export const signInHandler = async (req: Request, res: Response) => {

  try {
    
    const schema = Joi.object({
      email   : Joi.string().min(3).max(200).required().email(),
      password: Joi.string().min(6).max(200).required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      const { status, message } = new AuthCredentialInvalidException();
      return res.status(status).send(message);
    }
  
    let user = true;
    // await User.findOne({ email: req.body.email });
    
    if (!user) {
      const { status, message } = new AuthCredentialWrongException();
      return res.status(status).send(message);
    }
  
    const validPassword = true;
    // await bcrypt.compare(req.body.password, user.password);
    
    if (!validPassword){
      const { status, message } = new AuthCredentialWrongException();
      return res.status(status).send(message);
    }
  
    let userOnline: UserOnline = {
      uid     : 'a',
      username: 'a',
      name    : 'a',
      sex     : 'a',
      email   : 'a',
    }
  
    const jwtSecretKey: jwt.Secret = process.env.TODO_APP_JWT_SECRET_KEY || 'S0M3WH3R3';
    // const token                    = jwt.sign(userOnline, jwtSecretKey);
  
    const jwtRefreshKey: jwt.Secret = process.env.TODO_APP_JWT_REFRESH_KEY || 'S0M3WH3R3';
    const accessToken   = jwt.sign(userOnline, jwtSecretKey, { expiresIn: '1m' });
    const refreshToken  = jwt.sign(userOnline, jwtRefreshKey, { expiresIn: '3m' });
  
    res.cookie('refresh_token', refreshToken, { 
      // httpOnly: true,
      // sameSite: 'None',
      // secure  : true,
      maxAge  : 24 * 60 * 60 * 1000,
      // maxAge: 10000,
      // useCredentials: true
    });
  
    res.send(accessToken);

  } catch (error) {
    
    const { status, message } = new BasicErrorException();
    res.status(status).send(message);

  }
}

// export const signUpHandler = async (req: Request, res: Response) => {
//   const schema = Joi.object({
//     name    : Joi.string().min(3).max(30).required(),
//     email   : Joi.string().min(3).max(200).required().email(),
//     password: Joi.string().min(6).max(200).required(),
//   });

//   const { error } = schema.validate(req.body);

//   if (error) {
//     const { status, message } = new AuthCredentialWrongException();
//     return res.status(status).send(message);
//   }

//   let user: Partial<User> | any = true;
//   // await User.findOne({ email: req.body.email });

//   if (user) {
//     const { status, message } = new AuthCredentialInvalidException();
//     return res.status(status).send("User already exists...");
//   }

//   const { name, email, password } = req.body;

//   user = {
//     name    : name,
//     email   : email,
//     password: password,
//   }

//   const salt    = await bcryptjs.genSalt(10);
//   user.password = await bcryptjs.hash(user.password, salt);

//   await user.save();

//   const jwtSecretKey: jwt.Secret = process.env.TODO_APP_JWT_SECRET_KEY || 'S0M3WH3R3';
//   const token                    = jwt.sign(user, jwtSecretKey)

//   res.send(token);
// }