import { EntityState } from '@reduxjs/toolkit';
import store from './index';

import Image from '../helper/image/Image';
import CategoryThumbnail from '../helper/category/CategoryThumbnail';
import Category from '../helper/category/Category';

// Loading / Error State
export interface FetchingState {
    status: 'idle' | 'loading' | 'submitting' | 'failed' | 'success',
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

// Image fetching params / types
export interface FetchImageWithAdjacentParams {
    id: number;
    sameCategory: boolean;
}

export interface FetchKImagesParams {
    k: number;
    offset: number
}

export interface ImageWithAdjacent {
    previousId: number | null;
    current: Image | null;
    nextId: number | null
}

export interface Exif {
    iso?: number;
    shutterSpeed?: string;
    focalLength?: string;
    aperture?: string;
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

// Mains state/ store type
export type RootState = ReturnType<typeof store.getState>