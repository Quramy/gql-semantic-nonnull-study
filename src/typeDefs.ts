export const typeDefs = /* GraphQL */ `
  interface Node {
    id: ID!
  }

  type Post implements Node {
    id: ID!
    title: String!
    body: String!
    comments: [Comment!]!
  }

  type Comment implements Node {
    id: ID!
    body: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    node(id: ID!): Node
  }
`;
