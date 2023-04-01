import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page: number) => {
  const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${page}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const fetchSoloArticle = createAsyncThunk('articles/fetchSoloArticle', async (slug: string) => {
  const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data.article;
});

export interface ArticleType {
  author: {
    username: string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[] | number[];
  title: string;
  updatedAt: string;
}

interface ArticlesState {
  articlesData: ArticleType[];
  total: number;
  loading: boolean;
  articleLoading: boolean;
  currentPage: number;
  currentArticle: any /* | null */;
}

const initialState: ArticlesState = {
  articlesData: [],
  total: 1,
  loading: false,
  articleLoading: false,
  currentPage: 1,
  currentArticle: {},
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articlesData = action.payload.articles;
      state.total = action.payload.articlesCount;
      state.loading = false;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSoloArticle.pending, (state) => {
      state.articleLoading = true;
    });
    builder.addCase(fetchSoloArticle.fulfilled, (state, action) => {
      state.articleLoading = false;

      state.currentArticle = action.payload;
    });
  },
});

export const { setCurrentPage } = articleSlice.actions;
export default articleSlice.reducer;
