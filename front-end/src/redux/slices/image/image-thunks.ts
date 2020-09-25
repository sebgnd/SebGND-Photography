import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchImageWithAdjacentParams } from './image-types';
import { FetchPageParams } from '../../types';
import Image, { ImageWithAdjacent, ImagesWithPagination } from '../../../helper/image/Image';
import ImageApi from '../../../helper/image/ImageApi';

export const fetchImage = createAsyncThunk(
    'image/fetchSingleImage', 
    async (imageId: number): Promise<Image> => {
        const image: Image = await ImageApi.get(imageId);
        return image;
    }
);

export const fetchImageWithAdjacent = createAsyncThunk(
    'image/fetchImageWithAdjacent',
    async ({ id, sameCategory = false }: FetchImageWithAdjacentParams): Promise<ImageWithAdjacent | null> => {
        const images: (Image | null)[] = await ImageApi.getWithAdjacent(id, sameCategory);
        const previous: Image | null = images[0];
        const current: Image | null = images[1];
        const next: Image | null = images[2];

        if (current) {
            return {
                previousId: previous ? previous.id : null,
                current,
                nextId: next ? next.id : null
            }
        }
        return null;
    }
)

export const fetchImagesFromPage = createAsyncThunk(
    'image/fetchImagesFromPage', 
    async ({ page, itemsPerPage }: FetchPageParams): Promise<ImagesWithPagination> => {
        const result: ImagesWithPagination = await ImageApi.getPage(page, itemsPerPage);
        return result;
    }
)

export const fetchAllImage = createAsyncThunk(
    'image/fetchAllImage',
    async (): Promise<Image[]> => {
        const images: Image[] = await ImageApi.getAll();
        return images;
    }
)

// Fetching data from apis
export const fetchImagesFromCategory = createAsyncThunk(
    'image/fetchImagesFromCategory', 
    async (categoryId: string): Promise<Image[]> => {
        const images: Image[] = await ImageApi.getFromCategory(categoryId);
        return images;
    }
);