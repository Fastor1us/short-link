import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { shortLinkApi } from '../utils/api/shortLinkApi';


const rootReducer = combineReducers({
  [shortLinkApi.reducerPath]: shortLinkApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shortLinkApi.middleware,
    ),
});

export default store;
