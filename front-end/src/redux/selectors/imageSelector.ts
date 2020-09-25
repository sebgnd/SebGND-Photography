import Image from '../../helper/image/Image';
import { RootState } from '../types';
import { ImageFilterOptions } from '../slices/image/types';
import { imagesAdapter } from '../slices/image/slice';
import { Selector, createSelector } from '@reduxjs/toolkit';

export const selectSortOrder: Selector<RootState, string> = (state: RootState) => state.image.sortOrder;
export const selectSortOption: Selector<RootState, string> = (state: RootState) => state.image.sortBy;
export const selectImagesStatus: Selector<RootState, string> = (state: RootState) => state.image.status;
export const selectImagesError: Selector<RootState, string | undefined> = (state: RootState) => state.image.error;
export const selectAllImagesLoaded: Selector<RootState, boolean> = (state: RootState) => state.image.allLoaded;
export const selectSelectedImage: Selector<RootState, Image | null> = (state: RootState) => state.image.selected;
export const selectPreviousId: Selector<RootState, number | null> = (state: RootState) => state.image.previousId;
export const selectNextId: Selector<RootState, number | null> = (state: RootState) => state.image.nextId;
export const selectCurrentPage: Selector<RootState, number> = (state: RootState) => state.image.currentPage;
export const selectFilters: Selector<RootState, ImageFilterOptions> = (state: RootState) => state.image.filters;

export const {
    selectAll: selectAllImages,
    selectById: selectImageById,
} = imagesAdapter.getSelectors((state: RootState) => state.image);

export const selectFilteredImage = createSelector(
    [selectAllImages, selectFilters],
    (images: Image[], filters: ImageFilterOptions) => {
        const { categoryId } = filters;
        
        if (categoryId) {
            return images.filter((image: Image) => {
                return image.category.id === categoryId;
            })
        }
        return images;
    }
)

export const selectAmountImageByCategory = createSelector(
    [selectAllImages, (state: RootState, categoryId: string) => categoryId],
    (images, categoryId) => {
        return images.reduce((sum: number, current: Image) => {
            if (current.category.id === categoryId) {
                return sum + 1;
            }
            return sum;
        }, 0)
    }
);