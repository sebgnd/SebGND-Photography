import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ContactState, PostMessageParams } from '../types';
import { submittingCaseReducer, rejectCaseReducer, fulfilledCaseWithSuccesReducer } from '../reducers';

import Message from '../../helper/message/Message';
import MessageApi from '../../helper/message/MessageApi';

const initialState: ContactState = {
    status: 'idle',
    error: '',
};

export const postContactMessage = createAsyncThunk(
    'contact/postContactMessage',
    async ({ name, message }: PostMessageParams): Promise<Message> => {
        const messageSent = await MessageApi.sendMessage(message, name);
        return messageSent;
    }
)

const resetStatus = (state: ContactState) => {
    state.status = 'idle';
    state.error = '';
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: { 
        statusResetted: resetStatus 
    },
    extraReducers: (builder: ActionReducerMapBuilder<ContactState>) => {
        builder
            .addCase(postContactMessage.fulfilled, fulfilledCaseWithSuccesReducer)
            .addCase(postContactMessage.rejected, rejectCaseReducer)
            .addCase(postContactMessage.pending, submittingCaseReducer)
    }
});

export const { statusResetted } = contactSlice.actions;

export default contactSlice.reducer;