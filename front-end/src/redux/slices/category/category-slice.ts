import { createSlice, createEntityAdapter, ActionReducerMapBuilder, EntityAdapter, AnyAction } from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer } from '../../reducers';

import { 
    selectCategoryReducer, 
    fetchCategoriesFulfilledReducer, 
    fetchCategoryFulfilledReducer 
} from './reducers/category-reducer';

import { fetchCategories, fetchCategory } from './category-thunks';

import { CategoryState, CategoryAdditionalState } from './category-types';
import { FetchingState } from '../../types';

import { CategoryWithThumbnail } from '../../../helper/category/Category';

// Setting the adapter and initial state
export const categoryAdapter: EntityAdapter<CategoryWithThumbnail> = createEntityAdapter<CategoryWithThumbnail>({
    selectId: categoryThumbnail => categoryThumbnail.category.id,
    sortComparer: (a, b) => a.category.id.localeCompare(b.category.id)
});

const isRejectedAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('rejected') && action.type.startsWith('category');
}

const isPendingAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('pending') && action.type.startsWith('category');
}

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
            .addCase(fetchCategories.fulfilled, fetchCategoriesFulfilledReducer)
            .addCase(fetchCategory.fulfilled, fetchCategoryFulfilledReducer)
            .addMatcher(isRejectedAction, rejectCaseReducer)
            .addMatcher(isPendingAction, pendingCaseReducer);
    }
});

export default categorySlice;