import type { QueryResolvers } from "../__generated__/graphql.js";
import { decodeId } from "./nodeId.js";

export const Query = {
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany();
    return posts.map(post => ({ ...post, comments: [] }));
  },
  post: async (_, { id: nodeId }, { prisma }) => {
    const { id } = decodeId(nodeId);
    const post = await prisma.post.findUnique({ where: { id } });
    return post ? { ...post, comments: [] } : null;
  },
  node: async (_, { id: nodeId }, { prisma }) => {
    const { typeName, id } = decodeId(nodeId);
    if (typeName === "Post") {
      const node = await prisma.post.findUnique({ where: { id } });
      return node
        ? {
            __typename: "Post",
            ...node,
            comments: [],
          }
        : null;
    } else if (typeName === "Comment") {
      const node = await prisma.comment.findUnique({ where: { id } });
      return node
        ? {
            __typename: "Comment",
            ...node,
          }
        : null;
    } else {
      return null;
    }
  },
} satisfies QueryResolvers;
