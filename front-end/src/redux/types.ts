import store from './index';

export interface FetchingState {
    status: 'idle' | 'loading' | 'submitting' | 'failed' | 'success',
    error: string | undefined,
}
export interface FetchPageParams {
    page: number;
    itemsPerPage: number
}

export type RootState = ReturnType<typeof store.getState>