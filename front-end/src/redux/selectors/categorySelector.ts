import Category from '../../helper/category/Category';
import CategoryThumbnail from '../../helper/category/CategoryThumbnail';

import { createSelector, Selector, ParametricSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { categoryAdapter } from '../slices/category/slice';

export const selectCategoryStatus: Selector<RootState, string> = (state: RootState) => state.category.status;
export const selectCategoryError: Selector<RootState, string | undefined> = (state: RootState) => state.category.error;
export const selectCurrentCategory: Selector<RootState, Category | null> = (state: RootState) => state.category.selected;

export const {
    selectAll: selectAllCategoryThumbnails,
    selectById: selectCatagoryThumbnailById
} = categoryAdapter.getSelectors((state: RootState) => state.category);

const categoryByIdSelector: ParametricSelector<RootState, string, Category | undefined> = (state: RootState, categoryId: string) => {
    return state.category.entities[categoryId]?.category
};

export const selectCategoryById = createSelector<RootState, string, Category | undefined, Category | undefined>(
    [categoryByIdSelector],
    (category: Category | undefined) => {
        return category;
    }
);

export const selectAllCategories = createSelector<RootState, CategoryThumbnail[], Category[]>(
    [selectAllCategoryThumbnails],
    (thumbnails: CategoryThumbnail[]) => {
        const categories: Category[] = thumbnails.map(thumbnail => {
            return thumbnail.category;
        });
        return categories;
    }
)