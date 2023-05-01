import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		private readonly _fio: string,
		password?: string
	) {
		if(password) {
			this._password = password
		}
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

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password)
	}

}