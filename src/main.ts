import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserController } from './users/user.controller';
import { IUsersService } from './users/users.service.interface';
import { IUserController } from './users/user.controller.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
	bind<IUserController>(TYPES.UserController).to(UserController)
	bind<IUsersService>(TYPES.UserService).to(UsersService)
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App)
});

export interface IBootstrapReturn {
	app: App;
	appContainer: Container;
}

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
