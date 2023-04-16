import {LoggerService} from "./logger/logger.service";
import {App} from "./app";
import {UserController} from "./users/user.controller";
import {ExceptionFilter} from "./errors/exception.filter";

async function bootstrap() {
    const logger = new LoggerService()
    const app = new App(
        logger,
        new UserController(logger),
        new ExceptionFilter(logger)
    )


    await app.init()
}

bootstrap();