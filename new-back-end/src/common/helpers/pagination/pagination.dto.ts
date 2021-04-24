import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page = 1;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	itemsPerPage = 10;
}
