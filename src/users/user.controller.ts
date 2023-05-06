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
import { IUsersService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login, middlewares: [new ValidateMiddleware(UserLoginDto)] },
			{ path: '/info', method: 'get', func: this.info, middlewares: [new AuthGuard()] },
		]);
	}

	async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const isValid = await this.userService.validateUser(body);
			if (!isValid) {
				return next(new HTTPError(401, `Authorization error`, 'login'));
			}
			const jwt= await this.signJWT(body.email, this.configService.get('PRIVATE_KEY_JWT'))
			this.ok(res, {jwt});
		} catch (e) {
			if (e instanceof Error) {
				next(new HTTPError(401, `Authorization error: ${e.message}`, 'login'));
			}
		}
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HTTPError(402, `User with email: ${body.email} exist.`, 'UserController'));
		}

		this.ok(res, { email: result.email, id: result.id });
	}


	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{ email, iat: Math.floor(Date.now() / 1000) },
				secret,
				{ algorithm: "HS256" },
				(err, token) => {
					if (err) {
						reject(err);
					} else if (token) {
						resolve(token);
					}
				});
		});
	}

	async info(	{ user }: Request,
							 res: Response,
							 next: NextFunction,): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user)
		this.ok(res, {id: userInfo?.id, email: userInfo?.email})
	}

}
