import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './slices/image';
import categoryReducer from './slices/category';
import contactReducer from './slices/contact';

const store = configureStore({
    reducer: {
        image: imagesReducer,
        category: categoryReducer,
        contact: contactReducer
    }
});

export default store;