import type { CommentResolvers } from "../__generated__/graphql.js";
import { encodeId } from "./nodeId";

export const Comment = {
  id: parent => encodeId("Comment", parent),
  nullableField: async ({ star }) => {
    if (star === 1) {
      return null;
    }
    if (star % 2 === 0) {
      throw new Error("Unexpected error!");
    }
    return "field value";
  },
  strictField: async () => {
    throw new Error("Unexpected error!");
  },
  semanticNonNullField: async ({ star }) => {
    if (star === 1) {
      return null;
    }
    if (star % 2 === 0) {
      throw new Error("Unexpected error!");
    }
    return "field value";
  },
} satisfies CommentResolvers;
