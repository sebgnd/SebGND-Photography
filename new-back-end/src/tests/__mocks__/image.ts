import { Image } from '@models/image/image.entity';
import { ImageService } from '@models/image/image.service';
import { Provider } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { getMockRepository } from './repository';

export const mockPortrait: DeepPartial<Image> = {
	category: {
		id: '160a93d4-5ba1-4310-868a-1e471712ee59',
		createdAt: new Date('2021-04-24T16:14:29.123Z'),
		updatedAt: new Date('2021-04-24T16:14:29.123Z'),
		name: 'architecture',
		displayName: 'Architecture',
	},
	iso: 100,
	shutterSpeed: '1/60s',
	aperture: 'f10',
	focalLength: '24mm',
	equipments: [
		{
			id: '77ae9b6f-ae74-4010-ac7e-98c0aef5ceb9',
			createdAt: new Date('2021-04-22T15:41:28.018Z'),
			updatedAt: new Date('2021-04-22T15:41:28.018Z'),
			name: '24-70mm F2.8 DG DN | Art 019',
			displayName: '24-70mm F2.8 DG DN | Art 019',
			type: 'lense',
		},
		{
			id: 'da386350-e6f4-4032-9037-91b51cff0133',
			createdAt: new Date('2021-04-22T15:41:28.054Z'),
			updatedAt: new Date('2021-04-22T15:41:28.054Z'),
			name: 'SONY ILCE-7M3',
			displayName: 'SONY ILCE-7M3',
			type: 'camera',
		},
	],
	height: 5180,
	width: 3885,
	id: '3492daa8-f193-42f0-893c-988b65094c5d',
	createdAt: new Date('2021-04-25T07:31:36.781Z'),
	updatedAt: new Date('2021-04-25T07:31:36.781Z'),
	isCategoryThumbnail: false,
};

export const mockLandscape: DeepPartial<Image> = {
	category: {
		id: '160a93d4-5ba1-4310-868a-1e471712ee59',
		createdAt: new Date('2021-04-24T16:14:29.123Z'),
		updatedAt: new Date('2021-04-24T16:14:29.123Z'),
		name: 'architecture',
		displayName: 'Architecture',
	},
	iso: 125,
	shutterSpeed: '1/100s',
	aperture: 'f16',
	focalLength: '35.7mm',
	equipments: [
		{
			id: '77ae9b6f-ae74-4010-ac7e-98c0aef5ceb9',
			createdAt: new Date('2021-04-22T15:41:28.018Z'),
			updatedAt: new Date('2021-04-22T15:41:28.018Z'),
			name: '24-70mm F2.8 DG DN | Art 019',
			displayName: '24-70mm F2.8 DG DN | Art 019',
			type: 'lense',
		},
		{
			id: 'da386350-e6f4-4032-9037-91b51cff0133',
			createdAt: new Date('2021-04-22T15:41:28.054Z'),
			updatedAt: new Date('2021-04-22T15:41:28.054Z'),
			name: 'Canon 70D',
			displayName: 'Canon 70D',
			type: 'camera',
		},
	],
	height: 3637,
	width: 5995,
	id: 'c163c4ad-623a-44fe-8e58-0374f05ea88d',
	createdAt: new Date('2021-04-25T07:31:36.781Z'),
	updatedAt: new Date('2021-04-25T07:31:36.781Z'),
	isCategoryThumbnail: false,
};

export const mockImageServiceFactory = () => ({
	get: jest.fn(() => null),
	getTotalCount: jest.fn(() => null),
	getPaginated: jest.fn(() => null),
	getNextOrPreviousFrom: jest.fn(() => null),
	getAdjacentsFrom: jest.fn(() => null),
	readExifData: jest.fn(() => null),
	delete: jest.fn(() => null),
	create: jest.fn(() => null),
	deleteFiles: jest.fn(() => null),
	createFormatsForWeb: jest.fn(() => null),
	resize: jest.fn(() => null),
	saveFile: jest.fn(() => null),
});

export const MockImageService: Provider = {
	provide: ImageService,
	useFactory: mockImageServiceFactory,
};

export const MockImageRepository: Provider = getMockRepository(Image);
