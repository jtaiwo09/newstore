import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => "user",
    }),
    updateProfile: build.mutation({
      query: ({ id, ...others }) => {
        return {
          url: `user/${id}`,
          method: "PUT",
          body: { ...others },
        };
      },
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = userApi;
