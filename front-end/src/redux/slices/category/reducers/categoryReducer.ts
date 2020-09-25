import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CategoryState } from '../types';
import CategoryThumbnail from '../../../../helper/category/CategoryThumbnail';
import Category from '../../../../helper/category/Category';
import { fulfilledCaseReducer } from '../../../reducers';
import { categoryAdapter } from '../slice';

export const selectCategoryReducer = (state: CategoryState, action: PayloadAction<string>) => {
    const id = action.payload;
    const categoryThumbnail = state.entities[id];

    if (categoryThumbnail) {
        state.selected = categoryThumbnail.category;
    }
}

export const fetchCategoryThumbnailsFulfilledReducer: CaseReducer<CategoryState, PayloadAction<CategoryThumbnail[]>> = (state: CategoryState, action: PayloadAction<CategoryThumbnail[]>) => {
    fulfilledCaseReducer(state, action);
    categoryAdapter.setAll(state, action.payload);
}

export const fetchCategoryFulfilledReducer: CaseReducer<CategoryState, PayloadAction<Category>> = (state: CategoryState, action: PayloadAction<Category>) => {
    fulfilledCaseReducer(state, action);
    state.selected = action.payload;
}



