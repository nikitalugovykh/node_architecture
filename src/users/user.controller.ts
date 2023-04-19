import {NextFunction, Request, Response} from "express";
import {BaseController} from "../common/base.controller.js";
import {HTTPError} from "../errors/http-error.class.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types.js";
import {ILogger} from "../logger/logger.interface.js";
import 'reflect-metadata'


@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(TYPES.LoggerService) private loggerService: ILogger
    ) {
        super(loggerService);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register
            },
            {
                path: '/login',
                method: 'post',
                func: this.login
            },
        ])
    }


    public login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Ошибка авторизации'))
    }

    public register(req: Request, res: Response) {
        this.ok(res, 'register')
    }

}