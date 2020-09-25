import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '../category-types';
import Category, { CategoryWithThumbnail } from '../../../../helper/category/Category';
import { fulfilledCaseReducer } from '../../../reducers';
import { categoryAdapter } from '../category-slice';

export const selectCategoryReducer = (state: CategoryState, action: PayloadAction<string>) => {
    const id = action.payload;
    const categoryThumbnail = state.entities[id];

    if (categoryThumbnail) {
        state.selected = categoryThumbnail.category;
    }
}

export const fetchCategoriesFulfilledReducer: CaseReducer<CategoryState, PayloadAction<CategoryWithThumbnail[]>> = (state: CategoryState, action: PayloadAction<CategoryWithThumbnail[]>) => {
    fulfilledCaseReducer(state, action);
    categoryAdapter.setAll(state, action.payload);
}

export const fetchCategoryFulfilledReducer: CaseReducer<CategoryState, PayloadAction<Category>> = (state: CategoryState, action: PayloadAction<Category>) => {
    fulfilledCaseReducer(state, action);
    state.selected = action.payload;
}



