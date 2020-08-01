import { RootState } from '../types';
import { categoryAdapter } from '../slices/categorySlice';

export const selectCategoryStatus = (state: RootState) => state.category.status;
export const selectCategoryError = (state: RootState) => state.category.error;
export const selectCurrentCategory = (state: RootState) => state.category.selected;
export const selectCategoryById = (state: RootState, categoryId: string) => state.category.entities[categoryId]?.category;

export const {
    selectAll: selectAllCategoryThumbnails,
    selectById: selectCatagoryThumbnailById
} = categoryAdapter.getSelectors((state: RootState) => state.category);