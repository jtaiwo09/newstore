import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { authApi } from "../services/auth";
import { userApi } from "../services/user";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const decoded = jwtDecode(payload.accessToken);
          const user = {
            id: decoded.id,
            isAdmin: decoded.isAdmin,
            token: payload.accessToken,
          };
          const cookies = new Cookies();
          cookies.set("user", user, { path: "/" });
          state.user = payload;
        }
      )
      .addMatcher(authApi.endpoints.register.matchFulfilled, () => {
        //
      })
      .addMatcher(
        userApi.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
        }
      );
  },
});

export default userSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user
