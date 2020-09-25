import { EntityState } from '@reduxjs/toolkit';
import Category from '../../../helper/category/Category';
import CategoryThumbnail from '../../../helper/category/CategoryThumbnail';
import { FetchingState } from '../../types';

export interface CategoryAdditionalState {
    selected: Category | null;
}
export type CategoryState = CategoryAdditionalState & FetchingState & EntityState<CategoryThumbnail>;