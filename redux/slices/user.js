import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  uid: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const { email, uid, name } = action.payload;
      state.email = email;
      state.uid = uid;
      state.name = name;
    },
    setUserInactive: (state) => {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { setActiveUser, setUserInactive } = userSlice.actions;

export default userSlice.reducer;
