import { hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _fio: string,
	) {

	}

	get email(): string {
		return this._email;
	}

	get fio(): string {
		return this._fio;
	}

	get password(): string {
		return this._password;
	}

	get name(): string {
		return this._name;
	}

	public async setPassword(pass: string, salt: string): Promise<void> {
		this._password = await hash(pass, Number(salt));
	}

}