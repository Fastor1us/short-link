import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BACKEND_URL } from '../constants';

export const shortLinkApi = createApi({
  reducerPath: 'shortLinkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL
  }),
  endpoints: (build) => ({
    createLink: build.mutation({
      query: (link) => ({
        url: '/create',
        method: 'POST',
        body: { link },
      })
    }),
    readLink: build.mutation({
      query: (link) => ({
        url: `/redirect/${link}`,
      })
    })
  }),
});
