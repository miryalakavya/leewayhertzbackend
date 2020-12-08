const bcrypt = require('bcrypt');
import { Controller, Post } from "@overnightjs/core";
import { IUser, User } from "../models/user.model";
import { Response } from "express";
import { Request } from "express";

export interface IRequest<T> extends Request {
    body: T,
};

@Controller('user')
export class UserController {


    constructor() {

    }



    create = (user: Pick<IUser, 'name' | 'phoneNumber' | 'email' | 'password'>) => User.create(user);

    findIfUserNameExists(username: string) {
        return User.findOne({ username: username })
    }

    @Post('register')
    register(req: IRequest<IUser>, res: Response) {
        const data: IUser = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 2)
        };
        return this.create(data)
            .then((user: IUser) => {
                res.send({
                    message:'User registration is done successfully',
                    data: user,
                    success: true
                }).status(200);
            }).catch((err:{code:number,errmsg:string,name:string,message:string}) => {
                if (err.code === 11000 && err.name === 'MongoError') {
                    const field = err.errmsg.split("index:")[1].split("dup key")[0].split("_")[0];
                    return res.send({
                        message: `${field} already exists`,
                        success: false
                    }).status(200);
                }
                res.send({
                    message: `Error while creating user ${err.message}`,
                    success: false
                }).status(200);
            })
    }
}