import { ContactState } from '../types';

export const resetStatusReducer = (state: ContactState) => {
    state.status = 'idle';
    state.error = '';
}