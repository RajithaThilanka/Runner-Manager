import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
} from "@reduxjs/toolkit/query";
import { Task } from "../../screens/task.types";

const TASK_URL = "task";
const COMMENT = "comment";

export const TASK_API_TAGS = {
  TASK: "TASK",
};

export const taskEndpoints = (
  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      // eslint-disable-next-line @typescript-eslint/ban-types
      {},
      FetchBaseQueryMeta
    >,
    string,
    "runnerManagerApi"
  >
) => ({
  getAllTasks: builder.query<Task[], void>({
    query: () => `${TASK_URL}`,
    providesTags: [TASK_API_TAGS.TASK],
  }),
  getTaskById: builder.query<Task, number>({
    query: (id) => `${TASK_URL}/${id}`,
    providesTags: [TASK_API_TAGS.TASK],
  }),
  getTaskByUserUpn: builder.query<Task[], string>({
    query: (upn) => `${TASK_URL}/user-upn/${upn}`,
    providesTags: [TASK_API_TAGS.TASK],
  }),
  updateTask: builder.mutation<Task, Partial<Task>>({
    query: (payload) => ({
      url: `${TASK_URL}/${payload.id}`,
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: [TASK_API_TAGS.TASK],
  }),
  createTaskComment: builder.mutation<
    void,
    { taskId: number; content: string }
  >({
    query: ({ taskId, content }) => ({
      url: `${TASK_URL}/${taskId}/${COMMENT}`,
      method: "POST",
      body: { content },
    }),
    invalidatesTags: [TASK_API_TAGS.TASK],
  }),
  updateComment: builder.mutation<
    void,
    { taskId: number; commentId: number; content: string }
  >({
    query: ({ taskId, commentId, content }) => ({
      url: `${TASK_URL}/${taskId}/${COMMENT}/${commentId}`,
      method: "PUT",
      body: { content },
    }),
    invalidatesTags: [TASK_API_TAGS.TASK],
  }),
  getCommentsByTaskId: builder.query<Comment[], { taskId: number }>({
    query: ({ taskId }) => `${TASK_URL}/${taskId}/${COMMENT}`,
    providesTags: [TASK_API_TAGS.TASK],
  }),
  deleteComment: builder.mutation<void, { taskId: number; commentId: number }>({
    query: ({ taskId, commentId }) => ({
      url: `${TASK_URL}/${taskId}/${COMMENT}/${commentId}`,
      method: "DELETE",
    }),
    invalidatesTags: [TASK_API_TAGS.TASK],
  }),
});
