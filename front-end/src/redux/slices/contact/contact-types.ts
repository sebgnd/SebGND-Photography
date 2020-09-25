import { FetchingState } from '../../types';

export type ContactState = FetchingState;

export interface PostMessageParams {
    name: string;
    message: string;
}