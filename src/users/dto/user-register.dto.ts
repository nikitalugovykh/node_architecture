import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, {message: 'Email is not valid'})
	email: string
	@IsString({message: 'Password field not filled'})
	password: string
	@IsString({message: 'Name field not filled'})
	name: string
	@IsString({message: 'Fio field not filled'})
	fio: string
}