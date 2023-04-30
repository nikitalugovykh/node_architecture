import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUsersService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register, middlewares: [new ValidateMiddleware(UserRegisterDto)] },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log({ req: req.body });
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>,
								 res: Response,
								 next: NextFunction): Promise<void> {
		const result = await this.userService.createUser(body)

		if(!result) {
			return next(new HTTPError(402, 'Такой пользователь уже существует'))
		}


		this.ok(res, {email: result.email});
	}
}
