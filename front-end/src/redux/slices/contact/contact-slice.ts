import { createSlice, ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit';
import { ContactState } from './contact-types';
import { submittingCaseReducer, rejectCaseReducer, fulfilledCaseWithSuccesReducer } from '../../reducers';
import { resetStatusReducer } from './reducers/message-reducer';
import { postContactMessage } from './contact-thunks';

const initialState: ContactState = {
    status: 'idle',
    error: '',
};

const isRejectedAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('rejected') && action.type.startsWith('contact');
}

const isPendingAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('pending') && action.type.startsWith('contact');
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: { 
        statusResetted: resetStatusReducer 
    },
    extraReducers: (builder: ActionReducerMapBuilder<ContactState>) => {
        builder
            .addCase(
                postContactMessage.fulfilled, 
                fulfilledCaseWithSuccesReducer
            )
            .addMatcher(isRejectedAction, rejectCaseReducer)
            .addMatcher(isPendingAction, submittingCaseReducer)
    }
});

export default contactSlice;