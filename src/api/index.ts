import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TASK_API_TAGS, taskEndpoints } from "./task";
const apiURL: string = `https://b256-2402-4000-1200-e258-99e-9aa5-de79-1f94.ngrok-free.app`;
const generateTagTypes = (types: Record<string, string>[]): string[] => {
  const tags: string[] = [];
  types.forEach((type) => {
    for (const key in type) {
      if (Object.prototype.hasOwnProperty.call(type, key)) {
        tags.push(type[key]);
      }
    }
  });
  return tags;
};
const allTags = [TASK_API_TAGS];

export const runnerManagerApi = createApi({
  reducerPath: "runnerManagerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${apiURL}/api/` }),
  tagTypes: generateTagTypes(allTags),
  endpoints: (builder) => ({
    ...taskEndpoints(builder),
  }),
});

//Task endpoints
export const {
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useGetCommentsByTaskIdQuery,
  useUpdateTaskMutation,
  useGetTaskByUserUpnQuery,
} = runnerManagerApi;
