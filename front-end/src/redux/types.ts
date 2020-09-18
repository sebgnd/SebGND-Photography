import { EntityState } from '@reduxjs/toolkit';
import store from './index';

import Image, { Exif } from '../helper/image/Image';
import CategoryThumbnail from '../helper/category/CategoryThumbnail';
import Category from '../helper/category/Category';

// Loading / Error State
export interface FetchingState {
    status: 'idle' | 'loading' | 'submitting' | 'failed' | 'success',
    error: string | undefined,
}

// Images State
export interface ImageAdditionalState {
    sortBy: string;
    sortOrder: string;
    nextId: number | null,
    previousId: number | null,
    selected: Image | null,
    allLoaded: boolean,
    currentPage: number
}
export type ImagesState = ImageAdditionalState & FetchingState & EntityState<Image>;

// Category state
export interface CategoryAdditionalState {
    selected: Category | null;
}
export type CategoryState = CategoryAdditionalState & FetchingState & EntityState<CategoryThumbnail>;

// Image fetching params / types
export interface FetchImageWithAdjacentParams {
    id: number;
    sameCategory: boolean;
}

export interface UpdateImagePayload {
    id: number;
    exif: Exif;
}

// Contact slice

export type ContactState = FetchingState;

export interface PostMessageParams {
    name: string;
    message: string;
}

// Other

export interface FetchPageParams {
    page: number;
    itemsPerPage: number
}

// Mains state/ store type
export type RootState = ReturnType<typeof store.getState>