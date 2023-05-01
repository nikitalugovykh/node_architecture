import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';


@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput
	constructor(@inject(TYPES.LoggerService) private loggerService: ILogger) {
		const result: DotenvConfigOutput = config();
		console.log({result});
		if(result.error) {
			this.loggerService.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует')
		} else {
			this.loggerService.log('[ConfigService] Конфигурация загружена')
			this.config = result.parsed as DotenvParseOutput
		}
	}

	get(key: string): string {
		return this.config[key]
	}
}