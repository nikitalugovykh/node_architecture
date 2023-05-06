import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import 'reflect-metadata';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';


@injectable()
export class UsersService implements IUsersService {

	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private userRepository: IUsersRepository
	) {}

	async createUser({ email, name, fio, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = new User(email, name, fio);
		const salt = this.configService.get('SALT')
		await user.setPassword(password, salt);

		const existUser = await this.userRepository.find(email)

		if(!existUser) {
			return await this.userRepository.create(user)
		}

		return null;

	}

	async validateUser({password, email}: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email)
		if(!existedUser) return false
		const newUser = new User(existedUser.email, existedUser.name, existedUser.fio, existedUser.password)
		return newUser.comparePassword(password)

	}

	async getUserInfo(email: string): Promise<UserModel | null>{
		return this.userRepository.find(email)
	}


}