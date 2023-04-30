import { IUsersService } from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { UserRegisterDto } from './dto/user-register.dto';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUsersService {
	async createUser({email, name, fio, password}: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name, fio);
		await user.setPassword(password)
		// если есть то null
		// если нет, то создаем user

		return null

	}

	async validateUser({}: UserLoginDto): Promise<boolean> {
		return false
	}

}