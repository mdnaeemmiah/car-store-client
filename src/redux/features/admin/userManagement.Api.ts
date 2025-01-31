import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url:"/users",
        method:"GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User'],
    }),
    changeStatus: builder.mutation({
      query: ({id,status}) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body:{status},
      }),
      invalidatesTags: ['User'], 
    }),
    userRole: builder.mutation({
      query: ({id,role}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body:{role},
      }),
      invalidatesTags: ['User'], 
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useChangeStatusMutation,
  useUserRoleMutation
} = userApi;
