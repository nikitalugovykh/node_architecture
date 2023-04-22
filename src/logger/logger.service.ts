import { Logger } from 'tslog';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface.js';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger();
	}

	log(...args: unknown[]): void {
		this.logger.info(args);
	}

	error(...args: unknown[]): void {
		this.logger.error(args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(args);
	}
}
