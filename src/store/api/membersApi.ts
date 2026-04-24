import { baseApi } from "@/services/baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  avatar?: string;
}

export interface MembersListResponse {
  data: Member[];
  total: number;
  page: number;
  limit: number;
}

export interface MembersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
}

// ─── Members API ──────────────────────────────────────────────────────────────
export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query<MembersListResponse, MembersQueryParams>({
      query: ({ page = 1, limit = 10, search, status } = {}) => ({
        url: '/members',
        params: { page, limit, ...(search && { search }), ...(status && { status }) },
      }),
      providesTags: ['User'],
    }),

    getMemberById: builder.query<Member, string>({
      query: (id) => `/members/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    createMember: builder.mutation<Member, Partial<Member>>({
      query: (body) => ({
        url: '/members',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updateMember: builder.mutation<Member, { id: string; body: Partial<Member> }>({
      query: ({ id, body }) => ({
        url: `/members/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, 'User'],
    }),

    deleteMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `/members/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = membersApi;