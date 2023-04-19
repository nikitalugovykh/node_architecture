import express, {Express} from 'express'
import {Server} from 'http'
import {ILogger} from "./logger/logger.interface.js";
import {UserController} from "./users/user.controller.js";
import {ExceptionFilter} from "./errors/exception.filter.js";
import {inject, injectable} from "inversify";
import {TYPES} from "./types.js";
import 'reflect-metadata'

@injectable()
export class App {

    app: Express
    server: Server
    port: number

    constructor (
        @inject(TYPES.LoggerService) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/user', this.userController.router)
    }

    useExceptionFiler() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes()
        this.useExceptionFiler()
        this.server = this.app.listen(this.port)
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}

