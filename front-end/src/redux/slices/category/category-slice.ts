import { createSlice, createEntityAdapter, ActionReducerMapBuilder, EntityAdapter } from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer } from '../../reducers';

import { 
    selectCategoryReducer, 
    fetchCategoryThumbnailsFulfilledReducer, 
    fetchCategoryFulfilledReducer 
} from './reducers/category-reducer';

import { fetchCategoryThumbnails, fetchCategory } from './category-thunks';

import { CategoryState, CategoryAdditionalState } from './category-types';
import { FetchingState } from '../../types';

import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';

// Setting the adapter and initial state
export const categoryAdapter: EntityAdapter<CategoryThumbnail> = createEntityAdapter<CategoryThumbnail>({
    selectId: categoryThumbnail => categoryThumbnail.category.id,
    sortComparer: (a, b) => a.category.id.localeCompare(b.category.id)
});

const initialState: CategoryState = categoryAdapter.getInitialState<CategoryAdditionalState & FetchingState>({
    status: 'idle',
    error: '',
    selected: null
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categorySelected: selectCategoryReducer
    },
    extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
        builder
            .addCase(fetchCategoryThumbnails.fulfilled, fetchCategoryThumbnailsFulfilledReducer)
            .addCase(fetchCategory.fulfilled, fetchCategoryFulfilledReducer)
            .addCase(fetchCategory.pending, pendingCaseReducer)
            .addCase(fetchCategoryThumbnails.pending, pendingCaseReducer)
            .addCase(fetchCategory.rejected, rejectCaseReducer)
            .addCase(fetchCategoryThumbnails.rejected, rejectCaseReducer)

    }
});

export default categorySlice;