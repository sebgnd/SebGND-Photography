import contactSlice from './contact-slice';
import * as contactThunks from './contact-thunks';

export const { statusResetted } = contactSlice.actions;
export const { postContactMessage } = contactThunks;

export default contactSlice.reducer;
