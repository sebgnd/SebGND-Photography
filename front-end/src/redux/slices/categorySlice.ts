import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk, 
    ActionReducerMapBuilder, 
    PayloadAction, 
    EntityAdapter,
} from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer, fulfilledCaseReducer } from '../reducers';
import { CategoryState, CategoryAdditionalState, FetchingState } from '../types';

import CategoryThumbnail from '../../helper/category/CategoryThumbnail';
import CategoryApi from '../../helper/category/CategoryApi';
import Category from '../../helper/category/Category';

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

export const fetchCategoryThumbnails = createAsyncThunk('category/fetchCategoryThumbnails', async (k: number | undefined) => {
    if (k) {
        return await CategoryApi.getKThumbnail(k);
    }
    return await CategoryApi.getAllThumbnail();
});

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (categoryId: string) => {
    const category = await CategoryApi.get(categoryId);
    return category;
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categorySelected: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const categoryThumbnail = state.entities[id];

            if (categoryThumbnail) {
                state.selected = categoryThumbnail.category;
            }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<CategoryState>) => {
        builder
            .addCase(fetchCategoryThumbnails.fulfilled, (state, action: PayloadAction<CategoryThumbnail[]>) => {
                fulfilledCaseReducer(state, action);
                categoryAdapter.setAll(state, action.payload);
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                fulfilledCaseReducer(state, action);
                state.selected = action.payload;
            })
            .addCase(fetchCategory.pending, pendingCaseReducer)
            .addCase(fetchCategoryThumbnails.pending, pendingCaseReducer)
            .addCase(fetchCategory.rejected, rejectCaseReducer)
            .addCase(fetchCategoryThumbnails.rejected, rejectCaseReducer)

    }
});

export const { categorySelected } = categorySlice.actions;

export default categorySlice.reducer;