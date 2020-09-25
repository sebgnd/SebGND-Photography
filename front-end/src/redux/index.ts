import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/image';
import categoryReducer from './slices/category';
import contactReducer from './slices/contact';

const store = configureStore({
    reducer: {
        image: imageReducer,
        category: categoryReducer,
        contact: contactReducer
    }
});

export default store;