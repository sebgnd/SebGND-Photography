import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { ContactState } from './contact-types';
import { submittingCaseReducer, rejectCaseReducer, fulfilledCaseWithSuccesReducer } from '../../reducers';
import { resetStatusReducer } from './reducers/message-reducer';
import { postContactMessage } from './contact-thunks';

const initialState: ContactState = {
    status: 'idle',
    error: '',
};


const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: { 
        statusResetted: resetStatusReducer 
    },
    extraReducers: (builder: ActionReducerMapBuilder<ContactState>) => {
        builder
            .addCase(postContactMessage.fulfilled, fulfilledCaseWithSuccesReducer)
            .addCase(postContactMessage.rejected, rejectCaseReducer)
            .addCase(postContactMessage.pending, submittingCaseReducer)
    }
});

export default contactSlice;