import { CaseReducer, AnyAction } from '@reduxjs/toolkit';
import { FetchingState } from './types';

// Reusable reducers for handling fetching state
export const rejectCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'failed';
    state.error = action.error.message;
}

export const pendingCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'loading';
    state.error = '';
}

export const submittingCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'submitting';
    state.error = '';
}

export const fulfilledCaseWithSuccesReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'success';
    state.error = '';
}

export const fulfilledCaseReducer: CaseReducer<any, AnyAction> = <T extends object>(state: T & FetchingState, action: AnyAction) => {
    state.status = 'idle';
    state.error = '';
}