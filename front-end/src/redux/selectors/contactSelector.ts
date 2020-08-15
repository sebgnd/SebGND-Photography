
import { RootState } from '../types';
import { Selector, createSelector } from '@reduxjs/toolkit';

export const selectContactStatus: Selector<RootState, string> = (state: RootState) => state.contact.status;
export const selectContactError: Selector<RootState, string | undefined> = (state: RootState) => state.contact.error;