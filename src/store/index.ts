import { configureStore } from '@reduxjs/toolkit';

import articleSlice from './articleSlice';
import userSlice from './userSlice';
import singleArticleSlice from './singleArticleSlice';

export const store = configureStore({
  reducer: {
    article: articleSlice,
    user: userSlice,
    singleArticle: singleArticleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
