import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/user.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { json } from 'body-parser';

import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useExceptionFiler(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFiler();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
