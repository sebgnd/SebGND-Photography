export interface PaginationResponse<T> {
	items: T[];
	page: number;
	total: number;
}
