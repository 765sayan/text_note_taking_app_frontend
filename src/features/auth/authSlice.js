import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserService, loginService, registerService } from "./authService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  msg: null,
  nm: null,
};

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    return await loginService(user);
  } catch (error) {
    return error;
  }
});

export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    return await registerService(user);
  } catch (error) {
    return error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
});

export const getUser = createAsyncThunk("auth/getUser", async (Input) => {
  try {
    return await getUserService(Input);
  } catch (error) {
    return error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.token) {
          let token = action.payload.token;
          console.log(token);
          let name = token;
          const user = { name };
          state.user = user;
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          let msg = action.payload.msg;
          const message = { msg };
          state.msg = message;
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        state.msg = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.nm = action.payload.msg;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
