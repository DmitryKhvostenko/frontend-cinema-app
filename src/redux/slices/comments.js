import axios from '../../axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const sendComment = createAsyncThunk('comment/sendComment', async (params) => {
  const { data } = await axios.post('/auth/comments', params);
  return data;
});

export const deleteComment = createAsyncThunk('comment/deleteComment', async (commentId) => {
  await axios.delete(`/comments/${commentId}`);
});

export const commentsByFilmId = createAsyncThunk('comment/commentsByFilmId', async (filmId) => {
  const { data } = await axios.get(`/comments/film/${filmId}`);
  return data;
});

export const commentsByUserId = createAsyncThunk('comment/commentsByUserId', async (userId) => {
  const { data } = await axios.get(`/comments/user/${userId}`);
  return data;
});

const initialState = {
  comments: [],
  status: 'loading',
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendComment.pending, (state) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.data = action.payload;
      })
      .addCase(sendComment.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(commentsByFilmId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(commentsByFilmId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(commentsByFilmId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(commentsByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(commentsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(commentsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const commentReducer = commentSlice.reducer;
