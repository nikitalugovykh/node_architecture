import {Logger} from 'tslog'
import {injectable} from "inversify";
import {ILogger} from "./logger.interface.js";
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
    public logger: Logger<any>

    constructor() {
        this.logger = new Logger()
    }

    log(...args: unknown[]) {
        this.logger.info(args)
    }

    error(...args: unknown[]) {
        this.logger.error(args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(args)
    }
}