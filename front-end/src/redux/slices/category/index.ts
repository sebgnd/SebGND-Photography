import categorySlice from './slice';
import * as categoryThunk from './thunks';

export const { categorySelected } = categorySlice.actions;
export const { fetchCategoryThumbnails, fetchCategory } = categoryThunk;

export default categorySlice.reducer;