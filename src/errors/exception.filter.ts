import {Request, Response} from "express";
import {IExceptionFilter} from "./exception.filter.interface.js";
import {HTTPError} from "./http-error.class.js";
import {inject, injectable} from "inversify";
import {ILogger} from "../logger/logger.interface.js";
import {TYPES} from "../types.js";
import 'reflect-metadata'

@injectable()
export class ExceptionFilter implements IExceptionFilter{
    constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
        this.logger = logger
    }
    catch(err: Error | HTTPError, req: Request, res: Response) {
        if(err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode} ${err.message}`)
            res.status(err.statusCode).send({err: err.message})
        } else {
            this.logger.error(`${err.message}`)
            res.status(500).send({err: err.message})
        }
    }
}