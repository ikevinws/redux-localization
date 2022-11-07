import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { localizationSlice } from 'redux-localization';

const rootReducer = combineReducers({
    localization: localizationSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
