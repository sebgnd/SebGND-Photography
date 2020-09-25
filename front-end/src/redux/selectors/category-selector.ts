import Category, { CategoryWithThumbnail } from '../../helper/category/Category';

import { createSelector, Selector, ParametricSelector } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { categoryAdapter } from '../slices/category/category-slice';

export const selectCategoryStatus: Selector<RootState, string> = (state: RootState) => state.category.status;
export const selectCategoryError: Selector<RootState, string | undefined> = (state: RootState) => state.category.error;
export const selectCurrentCategory: Selector<RootState, Category | null> = (state: RootState) => state.category.selected;

export const {
    selectAll: selectAllCategoryThumbnails,
    selectById: selectCatagoryThumbnailById
} = categoryAdapter.getSelectors((state: RootState) => state.category);

const categoryByIdSelector: ParametricSelector<RootState, string | undefined, Category | undefined> = (state: RootState, categoryId?: string) => {
    if (categoryId) {
        return state.category.entities[categoryId]?.category
    }
    return undefined;
};

export const selectCategoryById = createSelector<RootState, string | undefined, Category | undefined, Category | undefined>(
    [categoryByIdSelector],
    (category: Category | undefined) => {
        return category;
    }
);

export const selectAllCategories = createSelector<RootState, CategoryWithThumbnail[], Category[]>(
    [selectAllCategoryThumbnails],
    (thumbnails: CategoryWithThumbnail[]) => {
        const categories: Category[] = thumbnails.map(thumbnail => {
            return thumbnail.category;
        });
        return categories;
    }
)