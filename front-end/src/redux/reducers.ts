import { CaseReducer, AnyAction } from '@reduxjs/toolkit';
import { FetchingState } from './types';

// Reusable reducers for handling fetching state
export const rejectCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'idle';
    state.error = action.error.message;
}

export const pendingCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'loading';
    state.error = '';
}

export const fulfilledCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'idle';
    state.error = '';
}