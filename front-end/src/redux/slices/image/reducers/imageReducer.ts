import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ImagesState,  UpdateImagePayload } from '../types';
import { fulfilledCaseReducer } from '../../../reducers';
import { imagesAdapter } from '../slice';
import Image, { ImagesWithPagination, ImageWithAdjacent } from '../../../../helper/image/Image';

// Regular reducer

export const updateExifReducer = (state: ImagesState, action: PayloadAction<UpdateImagePayload>) => {
    const { id, exif } = action.payload;
    const image = state.entities[id];

    if (image) {
        image.aperture = exif.aperture;
        image.focalLength = exif.focalLength;
        image.iso = exif.iso;
        image.shutterSpeed = exif.shutterSpeed
    }
}

export const emptyImageReducer = (state: ImagesState) => {
    imagesAdapter.setAll(state, []);

    state.allLoaded = false;
    state.status = 'idle';
    state.currentPage = 0;
}

export const selectImageReducer = (state: ImagesState, action: PayloadAction<number>) => {
    const id = action.payload;
    const image = state.entities[id];

    if (image) {
        const index = state.ids.findIndex(id => id === image.id);
        if (index - 1 >= 0) {
            state.nextId = state.ids[index - 1] as number;
        }
        if (index + 1 < state.ids.length) {
            state.previousId = state.ids[index + 1] as number;
        }
        state.selected = image; 
    }
}

// Reducer from async thunks

export const fetchImagesFromCategoryFulfilledReducer: CaseReducer<ImagesState, PayloadAction<Image[]>> = (state: ImagesState, action: PayloadAction<Image[]>) => {
    fulfilledCaseReducer(state, action);
    imagesAdapter.setAll(state, action.payload);
    state.allLoaded = true;
    state.filters = {
        minDate: undefined,
        maxDate: undefined,
        categoryId: undefined
    }
} 

export const fetchImageFulfilledReducer: CaseReducer<ImagesState, PayloadAction<Image>> = (state: ImagesState, action: PayloadAction<Image>) => {
    fulfilledCaseReducer(state, action);
    state.selected = action.payload;
}

export const fetchImagesFromPageFulfilledReducer: CaseReducer<ImagesState, PayloadAction<ImagesWithPagination>> = (state: ImagesState, action: PayloadAction<ImagesWithPagination>) => {
    fulfilledCaseReducer(state, action);

    if (action.payload.images.length !== 0) {
        imagesAdapter.upsertMany(state, action.payload.images);
    } 

    state.allLoaded = !action.payload.hasNext;
    state.currentPage = action.payload.page;
}


export const fetchImageWithAdjacentFulfilledReducer: CaseReducer<ImagesState, PayloadAction<ImageWithAdjacent | null>> = (state: ImagesState, action: PayloadAction<ImageWithAdjacent | null>) => {
    fulfilledCaseReducer(state, action);
    if (action.payload) {
        state.selected = action.payload.current;
        state.nextId = action.payload.nextId;
        state.previousId = action.payload.previousId;

        // Set the exif date
        if (action.payload.current) {
            const fetchedImage = action.payload.current;
            const image = state.entities[fetchedImage.id];

            if (image) {
                image.aperture = fetchedImage.aperture;
                image.focalLength = fetchedImage.focalLength;
                image.iso = fetchedImage.iso;
                image.shutterSpeed = fetchedImage.shutterSpeed;
            }
        }
    }
}

export const fetchAllImageFulfilledReducer: CaseReducer<ImagesState, PayloadAction<Image[]>> = (state: ImagesState, action: PayloadAction<Image[]>) => {
    fulfilledCaseReducer(state, action);
    imagesAdapter.setAll(state, action.payload);
    state.allLoaded = true;
    state.filters = {
        minDate: undefined,
        maxDate: undefined,
        categoryId: undefined
    }
}