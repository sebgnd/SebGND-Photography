import { Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const mockRepositoryFactory = () => ({
	findOne: jest.fn(() => null),
	find: jest.fn(() => null),
	create: jest.fn(() => null),
});

export const getMockRepository = (Model: EntityClassOrSchema): Provider => ({
	provide: getRepositoryToken(Model),
	useFactory: mockRepositoryFactory,
});
