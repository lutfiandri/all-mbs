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
      const { email, uid } = action.payload;
      console.log(email, uid);
      state.email = email;
      state.uid = uid;
    },
    setUserInactive: (state) => {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { setActiveUser, setUserInactive } = userSlice.actions;

export default userSlice.reducer;
