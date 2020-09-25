import { createSlice, createEntityAdapter, ActionReducerMapBuilder, EntityAdapter, AnyAction } from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer } from '../../reducers';

// Types
import { ImagesState, ImageAdditionalState } from './image-types';
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
} from './reducers/image-reducer';
import { filterByReducer } from './reducers/filter-reducer';
import {
    fetchImage,
    fetchImageWithAdjacent,
    fetchImagesFromPage,
    fetchAllImage,
    fetchImagesFromCategory,
} from './image-thunks';

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

const isRejectedAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('rejected') && action.type.startsWith('image');
}

const isPendingAction = (action: AnyAction): action is AnyAction => {
    return action.type.endsWith('pending') && action.type.startsWith('image');
}

// Main images slice
const imageSlice = createSlice({
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
            .addCase(
                fetchImagesFromCategory.fulfilled, 
                fetchImagesFromCategoryFulfilledReducer
            )
            .addCase(
                fetchImage.fulfilled, 
                fetchImageFulfilledReducer
            )
            .addCase(
                fetchImagesFromPage.fulfilled, 
                fetchImagesFromPageFulfilledReducer
            )
            .addCase(
                fetchImageWithAdjacent.fulfilled, 
                fetchImageWithAdjacentFulfilledReducer
            )
            .addCase(
                fetchAllImage.fulfilled, 
                fetchAllImageFulfilledReducer
            )
            .addMatcher(isPendingAction, pendingCaseReducer)
            .addMatcher(isRejectedAction, rejectCaseReducer)
    }
});

export default imageSlice;