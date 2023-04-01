import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegistration = createAsyncThunk(
  'user/fetchRegistration',
  async (authData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://blog.kata.academy/api/users',
        {
          user: authData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', response.data.user.token);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(Object.entries(error.response.data.errors)[0][0]);
    }
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get('https://blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (loginData: any) => {
  const response = await axios.post(
    'https://blog.kata.academy/api/users/login',
    {
      user: loginData,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  localStorage.setItem('token', response.data.user.token);

  return response.data;
});

export const fetchUpdateProfile = createAsyncThunk(
  'user/fetchUpdateProfile',
  async (authData: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        'https://blog.kata.academy/api/user',
        {
          user: authData,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      localStorage.setItem('token', response.data.user.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(Object.entries(error.response.data.errors)[0][0]);
    }
  }
);

interface initialStateType {
  user: {
    email: string;
    password: string;
    username: string;
    image?: string;
  };
  isLoggedIn: boolean;
  userLoading: boolean;
  error: string;
}

const initialState: initialStateType = {
  user: {
    email: '',
    password: '',
    username: '',
    image: '',
  },
  isLoggedIn: false,
  userLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setsIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setsIsLoggedOut(state) {
      state.isLoggedIn = false;
    },
    removeError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.error = 'none';
    });
    builder.addCase(fetchRegistration.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.userLoading = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = 'none';
    });
    builder.addCase(fetchUpdateProfile.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export const { setsIsLoggedIn, setsIsLoggedOut, removeError } = userSlice.actions;
export default userSlice.reducer;
