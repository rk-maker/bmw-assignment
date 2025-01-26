import { configureStore } from "@reduxjs/toolkit";
import detailReducer from './slices'

export const store =configureStore({

    reducer:{
        details:detailReducer,
    }
})