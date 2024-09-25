import { graphql, useLazyLoadQuery } from "react-relay";
import { Comment } from "./Comment";
import type { Home_Query } from "./__generated__/Home_Query.graphql";

const query = graphql`
  query Home_Query {
    posts {
      id
      title
      comments {
        id
        ...Comment_comment
      }
    }
  }
`;

export function Home() {
  const data = useLazyLoadQuery<Home_Query>(query, {});
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>
            <header>{post.title}</header>
            <ul>
              {post.comments.map(comment => (
                <li key={comment.id}>
                  <Comment comment={comment} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
