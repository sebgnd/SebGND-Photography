import { createSlice, createEntityAdapter, ActionReducerMapBuilder, EntityAdapter } from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer } from '../../reducers';

// Types
import { ImagesState, ImageAdditionalState } from './types';
import { FetchingState } from '../../types';

import Image from '../../../helper/image/Image';

import { 
    updateExifReducer,
    emptyImageReducer,
    fetchImagesFromCategoryFulfilledReducer,
    fetchImageFulfilledReducer,
    fetchImagesFromPageFulfilledReducer,
    fetchImageWithAdjacentFulfilledReducer,
    fetchAllImageFulfilledReducer,
    selectImageReducer
} from './reducers/imageReducer';
import { filterByReducer } from './reducers/filterReducer';
import {
    fetchImage,
    fetchImageWithAdjacent,
    fetchImagesFromPage,
    fetchAllImage,
    fetchImagesFromCategory,
} from './thunks';

// Setting the adapter and initial state
export const imagesAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
    sortComparer: (a, b) => b.id - a.id
});

const initialState: ImagesState = imagesAdapter.getInitialState<ImageAdditionalState & FetchingState>({
    status: 'idle',
    error: '',

    nextId: null,
    previousId: null,
    selected: null,

    allLoaded: false,
    sortBy: 'id',
    sortOrder: 'DESC',
    currentPage: 0,
    filters: {
        categoryId: undefined,
        minDate: undefined,
        maxDate: undefined
    }
});

// Main images slice
const imagesSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        imagesEmptied: emptyImageReducer,
        imageExifUpdated: updateExifReducer,
        imageSelected: selectImageReducer,
        imagesFiltered: filterByReducer
    },
    extraReducers: (builder: ActionReducerMapBuilder<ImagesState>) => {
        builder
            .addCase(fetchImagesFromCategory.fulfilled, fetchImagesFromCategoryFulfilledReducer)
            .addCase(fetchImage.fulfilled, fetchImageFulfilledReducer)
            .addCase(fetchImagesFromPage.fulfilled, fetchImagesFromPageFulfilledReducer)
            .addCase(fetchImageWithAdjacent.fulfilled, fetchImageWithAdjacentFulfilledReducer)
            .addCase(fetchAllImage.fulfilled, fetchAllImageFulfilledReducer)
            .addCase(fetchImagesFromCategory.pending, pendingCaseReducer)
            .addCase(fetchImage.pending, pendingCaseReducer)
            .addCase(fetchImagesFromPage.pending, pendingCaseReducer)
            .addCase(fetchImageWithAdjacent.pending, pendingCaseReducer)
            .addCase(fetchAllImage.pending, pendingCaseReducer)
            .addCase(fetchImagesFromCategory.rejected, rejectCaseReducer)
            .addCase(fetchImage.rejected, rejectCaseReducer)
            .addCase(fetchImagesFromPage.rejected, rejectCaseReducer)
            .addCase(fetchImageWithAdjacent.rejected, rejectCaseReducer)
            .addCase(fetchAllImage.rejected, rejectCaseReducer);
    }
});

export default imagesSlice;