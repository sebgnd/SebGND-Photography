import categorySlice from './category-slice';
import * as categoryThunk from './category-thunks';

export const { categorySelected } = categorySlice.actions;
export const { fetchCategoryThumbnails, fetchCategory } = categoryThunk;

export default categorySlice.reducer;