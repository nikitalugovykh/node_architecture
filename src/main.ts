
import {Container} from "inversify";
import {TYPES} from "./types.js";
import {IExceptionFilter} from "./errors/exception.filter.interface.js";
import {LoggerService} from "./logger/logger.service.js";
import {ILogger} from "./logger/logger.interface.js";
import {App} from "./app.js";
import {UserController} from "./users/user.controller.js";
import {ExceptionFilter} from "./errors/exception.filter.js";
import 'reflect-metadata'

// const logger = new LoggerService()
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExceptionFilter(logger)
// )
//


const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.LoggerService).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

const app = appContainer.get<App>(TYPES.Application)

app.init()

export {app, appContainer}
