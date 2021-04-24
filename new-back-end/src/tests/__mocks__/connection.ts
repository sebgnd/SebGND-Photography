import { Provider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

export const getMockConnection = (manager: Partial<EntityManager>): Provider => {
	return {
		provide: getConnectionToken(),
		useFactory: () => ({
			transaction: jest.fn((callback) => {
				return callback(manager);
			}),
		}),
	};
};
