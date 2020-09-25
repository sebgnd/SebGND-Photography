import imagesSlice from './slice';
import * as imagesThunks from './thunks';

export const { imagesEmptied, imageExifUpdated, imageSelected, imagesFiltered } = imagesSlice.actions;
export const { 
    fetchImage, 
    fetchImageWithAdjacent, 
    fetchImagesFromPage, 
    fetchAllImage, 
    fetchImagesFromCategory 
} = imagesThunks;

export default imagesSlice.reducer;