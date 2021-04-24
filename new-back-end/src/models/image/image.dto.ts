import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AdjacentsResponse {
	@ApiProperty()
	nextId?: string;

	@ApiProperty()
	previousId?: string;
}

export class AdjacentsQueryParams {
	@IsOptional()
	@Transform(({ value }: TransformFnParams) => value === 'true')
	@IsBoolean()
	sameCategory?: boolean;
}
