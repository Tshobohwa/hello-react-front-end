import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMessage = createAsyncThunk('messages/getMessage', async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:3000/api/v1/random_greeting',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.message.greeting;
  } catch (error) {
    return error;
  }
});

const initialState = {
  error: undefined,
  message: undefined,
  pending: false,
};

const messagesSlices = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state) => ({ ...state, pending: true }))
      .addCase(getMessage.fulfilled, (state, { payload }) => ({
        ...state,
        message: payload,
        pending: false,
      }))
      .addCase(getMessage.rejected, (state, { payload }) => ({
        ...state,
        error: payload,
        pending: false,
      }));
  },
});

export default messagesSlices.reducer;
