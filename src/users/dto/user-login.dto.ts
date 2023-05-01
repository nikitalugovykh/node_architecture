import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, {message: 'Email is not valid'})
	@IsString({message: 'Email field not filled'})
	email: string
	@IsString({message: 'Password field not filled'})
	password: string
}