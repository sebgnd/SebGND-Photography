import { EntityState } from '@reduxjs/toolkit';
import store from './index';

import Image from '../helper/image/Image';
import CategoryThumbnail from '../helper/category/CategoryThumbnail';
import Category from '../helper/category/Category';

// Loading / Error State
export interface FetchingState {
    status: 'idle' | 'loading' | 'submitting',
    error: string | undefined,
}

// Images State
export interface ImageAdditionalState {
    nextId: number | null,
    previousId: number | null,
    selected: Image | null,
    allLoaded: boolean
}
export type ImagesState = ImageAdditionalState & FetchingState & EntityState<Image>;

// Category state
export interface CategoryAdditionalState {
    selected: Category | null;
}
export type CategoryState = CategoryAdditionalState & FetchingState & EntityState<CategoryThumbnail>;

export type RootState = ReturnType<typeof store.getState>