import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query(user) {
        return {
          url: "auth/login",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
