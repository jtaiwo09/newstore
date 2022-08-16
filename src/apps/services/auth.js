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
    register: build.mutation({
      query(user) {
        return {
          url: "auth/signup",
          method: "POST",
          body: user,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: build.query({
      query: ({ userId, uniqueString }) =>
        `auth/verify/${userId}/${uniqueString}`,
      invalidatesTags: ["Auth"],
    }),
    resendVerification: build.mutation({
      query(email) {
        return {
          url: "auth/resend",
          method: "POST",
          body: email,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    forgotPwd: build.mutation({
      query(email) {
        return {
          url: "auth/reset-password",
          method: "POST",
          body: email,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    resetPassword: build.query({
      query: ({ userId, uniqueString }) =>
        `/auth/reset-password/${userId}/${uniqueString}`,
      invalidatesTags: ["Auth"],
    }),
    changePassword: build.mutation({
      query({ userId, password }) {
        console.log(userId, password);
        return {
          url: `auth/changepassword/${userId}`,
          method: "POST",
          body: { password },
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailQuery,
  useResendVerificationMutation,
  useForgotPwdMutation,
  useResetPasswordQuery,
  useChangePasswordMutation,
} = authApi;
