import { RootState } from '../types';
import { imagesAdapter } from '../slices/imagesSlice';

export const selectImagesStatus = (state: RootState) => state.image.status;
export const selectImagesError = (state: RootState) => state.image.error;
export const selectAllImagesLoaded = (state: RootState) => state.image.allLoaded;
export const selectSelectedImage = (state: RootState) => state.image.selected;
export const selectPreviousId = (state: RootState) => state.image.previousId;
export const selectNextId = (state: RootState) => state.image.nextId;

export const {
    selectAll: selectAllImages,
    selectById: selectImageById,
} = imagesAdapter.getSelectors((state: RootState) => state.image);