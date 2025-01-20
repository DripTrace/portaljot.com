// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface DB {
//   id: number;
//   text: string;
//   active: boolean;
//   done: boolean;
// }

// export const dbApi = createApi({
//   reducerPath: 'dbApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${process.env.MERCH_API}/` }),
//   tagTypes: ['DBs'],
//   endpoints: (builder) => ({
//     getAll: builder.query<DB[], void>({
//       query: () => `dbs`,
//       providesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     updateDB: builder.mutation<DB, DB>({
//       query(db) {
//         return {
//           url: `api/dbs/[${db.id}]`,
//           method: 'PUT',
//           body: db,
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     deleteDB: builder.mutation<DB, DB>({
//       query(db) {
//         return {
//           url: `api/dbs/[${db.id}]`,
//           method: 'DELETE',
//           body: db,
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//     addDB: builder.mutation<string, string>({
//       query(text) {
//         return {
//           url: `dbs`,
//           method: 'POST',
//           body: {
//             text,
//           },
//         };
//       },
//       invalidatesTags: [{ type: 'DBs', id: 'LIST' }],
//     }),
//   }),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
    id: number;
    text: string;
    active: boolean;
    done: boolean;
}

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.MERCH_API}/`,
        // baseUrl: `http://localhost:420/api/`,
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getAll: builder.query<Todo[], void>({
            query: () => `todos`,
            providesTags: [{ type: "Todos", id: "LIST" }],
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query(todo) {
                return {
                    url: `todos/[${todo.id}]`,
                    method: "PUT",
                    body: todo,
                };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
        deleteTodo: builder.mutation<Todo, Todo>({
            query(todo) {
                return {
                    url: `todos/[${todo.id}]`,
                    method: "DELETE",
                    body: todo,
                };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
        addTodo: builder.mutation<string, string>({
            query(text) {
                return {
                    url: `todos`,
                    method: "POST",
                    body: {
                        text,
                    },
                };
            },
            invalidatesTags: [{ type: "Todos", id: "LIST" }],
        }),
    }),
});
