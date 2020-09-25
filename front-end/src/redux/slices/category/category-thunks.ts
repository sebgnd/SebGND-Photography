import { createAsyncThunk } from '@reduxjs/toolkit';
import CategoryApi from '../../../helper/category/CategoryApi';

export const fetchCategoryThumbnails = createAsyncThunk('category/fetchCategoryThumbnails', async (k: number | undefined) => {
    if (k) {
        return await CategoryApi.getKThumbnail(k);
    }
    return await CategoryApi.getAllThumbnail();
});

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (categoryId: string) => {
    const category = await CategoryApi.get(categoryId);
    return category;
});