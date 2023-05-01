import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata'

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
	) {
		this.client = new PrismaClient()
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] BD is connected')
		} catch(e) {
			if(e instanceof Error) {
				this.logger.log(`[PrismaService] Error with bd connection: ${e.message} `)
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
		this.logger.log('[PrismaService] Bd is disconnected')
	}
}