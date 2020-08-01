import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imagesSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
    reducer: {
        image: imagesReducer,
        category: categoryReducer
    }
});

export default store;