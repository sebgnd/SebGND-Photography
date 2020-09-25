import { EntityState } from '@reduxjs/toolkit';
import Category, { CategoryWithThumbnail } from '../../../helper/category/Category';
import { FetchingState } from '../../types';

export interface CategoryAdditionalState {
    selected: Category | null;
}
export type CategoryState = CategoryAdditionalState & FetchingState & EntityState<CategoryWithThumbnail>;