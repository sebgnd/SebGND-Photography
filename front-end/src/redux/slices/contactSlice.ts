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

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ContactState>) => {
        builder
            .addCase(postContactMessage.fulfilled, fulfilledCaseWithSuccesReducer)
            .addCase(postContactMessage.rejected, rejectCaseReducer)
            .addCase(postContactMessage.pending, submittingCaseReducer)
    }
});

export const {  } = contactSlice.actions;

export default contactSlice.reducer;