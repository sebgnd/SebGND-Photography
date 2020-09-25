import contactSlice from './slice';
import * as contactThunks from './thunks';

export const { statusResetted } = contactSlice.actions;
export const { postContactMessage } = contactThunks;

export default contactSlice.reducer;
