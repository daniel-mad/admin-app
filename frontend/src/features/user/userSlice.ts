import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { info: {} },
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
