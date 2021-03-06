import { PayloadAction } from "@reduxjs/toolkit";
import { ImagesState, FilterPayload } from '../image-types';

export const filterByReducer = (state: ImagesState, action: PayloadAction<FilterPayload>) => {
    const { property, value } = action.payload;
    state.filters[property] = value;
}