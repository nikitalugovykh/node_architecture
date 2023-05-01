import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import 'reflect-metadata';


@injectable()
export class UsersService implements IUsersService {

	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {
	}

	async createUser({ email, name, fio, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name, fio);
		const salt = this.configService.get('SALT')
		console.log(salt);
		await user.setPassword(password, salt);
		// если есть то null
		// если нет, то создаем user

		return null;

	}

	async validateUser({}: UserLoginDto): Promise<boolean> {
		return false;
	}

}