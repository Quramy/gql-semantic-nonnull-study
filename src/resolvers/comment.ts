import type { CommentResolvers } from "../__generated__/graphql.js";
import { encodeId } from "./nodeId";

export const Comment = {
  id: parent => encodeId("Comment", parent),
} satisfies CommentResolvers;
