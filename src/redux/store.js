import { authReducer } from './slices/auth';
import { commentReducer } from './slices/comments';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
  },
});

export default store;
