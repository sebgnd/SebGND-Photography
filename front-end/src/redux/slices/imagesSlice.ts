import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk, 
    ActionReducerMapBuilder, 
    PayloadAction, 
    EntityAdapter,
} from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer, fulfilledCaseReducer } from '../reducers';
import { ImagesState, ImageAdditionalState, FetchingState } from '../types';

import Image from '../../helper/image/Image';
import ImageApi from '../../helper/image/ImageApi';

// Setting the adapter and initial state
export const imagesAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
    selectId: image => image.id,
    sortComparer: (a, b) => b.id - a.id
});
const initialState: ImagesState = imagesAdapter.getInitialState<ImageAdditionalState & FetchingState>({
    status: 'idle',
    error: '',
    nextId: null,
    previousId: null,
    selected: null,
    allLoaded: false
});

// Fetching data from apis
export const fetchImagesFromCategory = createAsyncThunk('image/fetchImagesFromCategory', async (categoryId: string) => {
    const images: Image[] = await ImageApi.getFromCategory(categoryId);
    return images;
});

export const fetchImage = createAsyncThunk('image/fetchSingleImage', async (imageId: number) => {
    const image: Image = await ImageApi.get(imageId);
    return image;
})

interface FetchKImagesParams {
    k: number;
    offset: number
}
export const fetchKImagesFromOffset = createAsyncThunk('image/fetchKImagesFromOffset', async (params: FetchKImagesParams) => {
    const { k, offset } = params;
    const images: Image[] = await ImageApi.getKFromOffset(k, offset);
    return images;
})

// Main images slice
const imagesSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        imageSelected: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const image = state.entities[id];

            if (image) {
                state.selected = image; 
            }
        },
        imagesEmptied: (state) => {
            imagesAdapter.setAll(state, []);
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<ImagesState>) => {
        builder
            .addCase(fetchImagesFromCategory.fulfilled, (state, action: PayloadAction<Image[]>) => {
                fulfilledCaseReducer(state, action);
                imagesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchImage.fulfilled, (state, action: PayloadAction<Image>) => {
                fulfilledCaseReducer(state, action);
                state.selected = action.payload;
            })
            .addCase(fetchKImagesFromOffset.fulfilled, (state, action: PayloadAction<Image[]>) => {
                fulfilledCaseReducer(state, action);
                if (action.payload.length !== 0) {
                    imagesAdapter.upsertMany(state, action.payload);
                } else {
                    state.allLoaded = true;
                }
            })
            .addCase(fetchImagesFromCategory.pending, pendingCaseReducer)
            .addCase(fetchImage.pending, pendingCaseReducer)
            .addCase(fetchKImagesFromOffset.pending, pendingCaseReducer)
            .addCase(fetchImagesFromCategory.rejected, rejectCaseReducer)
            .addCase(fetchImage.rejected, rejectCaseReducer)
            .addCase(fetchKImagesFromOffset.rejected, rejectCaseReducer);
    }
});

export const { imageSelected, imagesEmptied } = imagesSlice.actions;

export default imagesSlice.reducer;