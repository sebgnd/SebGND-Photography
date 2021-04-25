import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const MockConfigService: Provider = {
	provide: ConfigService,
	useFactory: () => ({
		get: jest.fn(() => null),
	}),
};
