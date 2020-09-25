import { EntityState } from '@reduxjs/toolkit';
import Image, { Exif } from '../../../helper/image/Image';
import { FetchingState } from '../../types';

export interface ImageFilterOptions {
    categoryId: string | undefined;
    minDate: string | undefined;
    maxDate: string | undefined;
}

export interface ImageAdditionalState {
    // Main data
    nextId: number | null,
    previousId: number | null,
    selected: Image | null,
    
    // Display data
    allLoaded: boolean,
    currentPage: number;
    sortBy: string;
    sortOrder: string;
    filters: ImageFilterOptions;
}
export type ImagesState = ImageAdditionalState & FetchingState & EntityState<Image>;

// Image fetching params / types
export interface FetchImageWithAdjacentParams {
    id: number;
    sameCategory: boolean;
}

export interface UpdateImagePayload {
    id: number;
    exif: Exif;
}

export interface FilterPayload {
    property: keyof ImageFilterOptions;
    value: ImageFilterOptions[keyof ImageFilterOptions]; 
}

export interface OrderImagePayload {
    orderByProperty: string;
    order: 'ASC' | 'DESC';
}