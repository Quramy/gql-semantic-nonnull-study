import { graphql, useLazyLoadQuery } from "react-relay";
import type { Home_Query } from "./__generated__/Home_Query.graphql";

const query = graphql`
  query Home_Query {
    posts {
      id
      title
    }
  }
`;

export function Home() {
  const data = useLazyLoadQuery<Home_Query>(query, {});
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {data.posts.map(p => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}
