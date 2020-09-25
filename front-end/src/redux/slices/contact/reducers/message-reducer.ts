import { ContactState } from '../contact-types';

export const resetStatusReducer = (state: ContactState) => {
    state.status = 'idle';
    state.error = '';
}