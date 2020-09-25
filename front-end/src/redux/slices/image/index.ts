import imagesSlice from './image-slice';
import * as imagesThunks from './image-thunks';

export const { imagesEmptied, imageExifUpdated, imageSelected, imagesFiltered } = imagesSlice.actions;
export const { 
    fetchImage, 
    fetchImageWithAdjacent, 
    fetchImagesFromPage, 
    fetchAllImage, 
    fetchImagesFromCategory 
} = imagesThunks;

export default imagesSlice.reducer;