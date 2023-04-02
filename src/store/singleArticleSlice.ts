import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { UpdatePostDataType, CreatePostDataType } from '../components/type/types';

interface InitialStateType {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
  loading: boolean;
}

export const fetchCreatePost = createAsyncThunk(
  'singleArticle/fetchCreatePost',
  async (authData: CreatePostDataType) => {
    const response = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: authData,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchDeletePost = createAsyncThunk('singleArticle/fetchDeletepost', async (slug: string) => {
  const response = await axios.delete(
    `https://blog.kata.academy/api/articles/${slug}`,

    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

export const fetchUpdatePost = createAsyncThunk(
  'singleArticle/fetchUpdatePost',
  async (authData: UpdatePostDataType) => {
    const response = await axios.put(
      `https://blog.kata.academy/api/articles/${authData.slug}`,
      {
        article: authData.updateData,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchSetLike = createAsyncThunk('singleArticle/fetchSetLike', async (slug: string) => {
  const response = await axios.post(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {
      body: '',
    },

    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

export const fetchRemoveLike = createAsyncThunk('singleArticle/fetchRemoveLike', async (slug: string) => {
  const response = await axios.delete(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,

    {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
});

const initialState: InitialStateType = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: ['a', 'a'],
  },
  loading: false,
};

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState,
  reducers: {
    setCurrentPage(state) {
      state.article.title = 'sd';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCreatePost.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchSetLike.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default singleArticleSlice.reducer;
