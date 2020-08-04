import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/imageSlice';
import categoryReducer from './slices/categorySlice';
import contactReducer from './slices/contactSlice';

const store = configureStore({
    reducer: {
        image: imagesReducer,
        category: categoryReducer,
        contact: contactReducer
    }
});

export default store;