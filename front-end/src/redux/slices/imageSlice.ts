import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk, 
    ActionReducerMapBuilder, 
    PayloadAction, 
    EntityAdapter,
    Middleware,
} from '@reduxjs/toolkit';
import { rejectCaseReducer, pendingCaseReducer, fulfilledCaseReducer } from '../reducers';
import { 
    ImagesState, 
    ImageAdditionalState, 
    FetchingState,
    FetchImageWithAdjacentParams,
    FetchKImagesParams,
    ImageWithAdjacent,
    Exif,
    UpdateImagePayload
} from '../types';

import Image from '../../helper/image/Image';
import ImageApi from '../../helper/image/ImageApi';

// Setting the adapter and initial state
export const imagesAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
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
export const fetchImagesFromCategory = createAsyncThunk(
    'image/fetchImagesFromCategory', 
    async (categoryId: string): Promise<Image[]> => {
        const images: Image[] = await ImageApi.getFromCategory(categoryId);
        return images;
    }
);

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

export const fetchKImagesFromOffset = createAsyncThunk(
    'image/fetchKImagesFromOffset', 
    async ({ k, offset }: FetchKImagesParams): Promise<Image[]> => {
        const images: Image[] = await ImageApi.getKFromOffset(k, offset);
        return images;
    }
)

const updateExifReducer = (state: ImagesState, action: PayloadAction<UpdateImagePayload>) => {
    const { id, exif } = action.payload;
    const image = state.entities[id];

    if (image) {
        image.aperture = exif.aperture;
        image.focalLength = exif.focalLength;
        image.iso = exif.iso;
        image.shutterSpeed = exif.shutterSpeed
    }
}

const emptyImageReducer = (state: ImagesState) => {
    imagesAdapter.setAll(state, []);
    state.allLoaded = false;
    state.status = 'idle';
}

const selectImageReducer = (state: ImagesState, action: PayloadAction<number>) => {
    const id = action.payload;
    const image = state.entities[id];

    if (image) {
        const index = state.ids.findIndex(id => id === image.id);
        if (index - 1 >= 0) {
            state.nextId = state.ids[index - 1] as number;
        }
        if (index + 1 < state.ids.length) {
            state.previousId = state.ids[index + 1] as number;
        }
        state.selected = image; 
    }
}

// Main images slice
const imagesSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        imageSelected: selectImageReducer,
        imagesEmptied: emptyImageReducer,
        imageExifUpdated: updateExifReducer
    },
    extraReducers: (builder: ActionReducerMapBuilder<ImagesState>) => {
        builder
            .addCase(fetchImagesFromCategory.fulfilled, (state, action: PayloadAction<Image[]>) => {
                fulfilledCaseReducer(state, action);
                imagesAdapter.setAll(state, action.payload);
                state.allLoaded = true;
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
            .addCase(fetchImageWithAdjacent.fulfilled, (state, action: PayloadAction<ImageWithAdjacent | null>) => {
                fulfilledCaseReducer(state, action);
                if (action.payload) {
                    state.selected = action.payload.current;
                    state.nextId = action.payload.nextId;
                    state.previousId = action.payload.previousId;

                    // Set the exif date
                    if (action.payload.current) {
                        const fetchedImage = action.payload.current;
                        const image = state.entities[fetchedImage.id];

                        if (image) {
                            image.aperture = fetchedImage.aperture;
                            image.focalLength = fetchedImage.focalLength;
                            image.iso = fetchedImage.iso;
                            image.shutterSpeed = fetchedImage.shutterSpeed;
                        }
                    }
                }
            })
            .addCase(fetchImagesFromCategory.pending, pendingCaseReducer)
            .addCase(fetchImage.pending, pendingCaseReducer)
            .addCase(fetchKImagesFromOffset.pending, pendingCaseReducer)
            .addCase(fetchImageWithAdjacent.pending, pendingCaseReducer)
            .addCase(fetchImagesFromCategory.rejected, rejectCaseReducer)
            .addCase(fetchImage.rejected, rejectCaseReducer)
            .addCase(fetchKImagesFromOffset.rejected, rejectCaseReducer)
            .addCase(fetchImageWithAdjacent.rejected, rejectCaseReducer);
    }
});

export const { imageSelected, imagesEmptied, imageExifUpdated } = imagesSlice.actions;

export default imagesSlice.reducer;