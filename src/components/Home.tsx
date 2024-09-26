import { Suspense, useMemo } from "react";
import {
  graphql,
  useQueryLoader,
  useLazyLoadQuery,
  usePreloadedQuery,
  type PreloadedQuery,
  type GraphQLTaggedNode,
} from "react-relay";
import { OperationType } from "relay-runtime";

import { ErrorThrowBlock } from "./ErrorThrowBlock";
import type { Home_ErrorThrowBlock_Query } from "./__generated__/Home_ErrorThrowBlock_Query.graphql";

import { ErrorCatchBlock } from "./ErrorCatchBlock";
import type { Home_ErrorCatchBlock_Query } from "./__generated__/Home_ErrorCatchBlock_Query.graphql";

const queryForErrorThrowBlock = graphql`
  query Home_ErrorThrowBlock_Query {
    posts {
      id
      title
      comments {
        id
        ...ErrorThrowBlock_Comment
      }
    }
  }
`;

function PostsForThrowBlock({
  preloadedQuery,
}: {
  readonly preloadedQuery: PreloadedQuery<Home_ErrorThrowBlock_Query>;
}) {
  const data = usePreloadedQuery(queryForErrorThrowBlock, preloadedQuery);
  return (
    <>
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>
            <header>{post.title}</header>
            <ul>
              {post.comments.map(comment => (
                <li key={comment.id}>
                  <ErrorThrowBlock comment={comment} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

const queryForErrorCatchBlock = graphql`
  query Home_ErrorCatchBlock_Query {
    posts {
      id
      title
      comments {
        id
        ...ErrorCatchBlock_Comment
      }
    }
  }
`;

function PostsForCatchBlock({
  preloadedQuery,
}: {
  readonly preloadedQuery: PreloadedQuery<Home_ErrorCatchBlock_Query>;
}) {
  const data = usePreloadedQuery(queryForErrorCatchBlock, preloadedQuery);
  return (
    <>
      <ul>
        {data.posts.map(post => (
          <li key={post.id}>
            <header>{post.title}</header>
            <ul>
              {post.comments.map(comment => (
                <li key={comment.id}>
                  <ErrorCatchBlock comment={comment} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Home() {
  const loaderForThrowBlock = useQueryLoaderObj<Home_ErrorThrowBlock_Query>(queryForErrorThrowBlock);
  const loaderForCatchBlock = useQueryLoaderObj<Home_ErrorCatchBlock_Query>(queryForErrorCatchBlock);
  return (
    <>
      <section>
        <header>Use @throwOnFieldError</header>
        <button onClick={() => loaderForThrowBlock.loadQuery({}, { fetchPolicy: "store-and-network" })}>Load</button>
        <button onClick={() => loaderForThrowBlock.dispose()}>Dispose</button>
        {loaderForThrowBlock.queryRef && (
          <Suspense fallback={"loading..."}>
            <PostsForThrowBlock preloadedQuery={loaderForThrowBlock.queryRef} />
          </Suspense>
        )}
      </section>
      <section>
        <header>Use @catch</header>
        <button onClick={() => loaderForCatchBlock.loadQuery({}, { fetchPolicy: "store-and-network" })}>Load</button>
        <button onClick={() => loaderForCatchBlock.dispose()}>Dispose</button>
        {loaderForCatchBlock.queryRef && (
          <Suspense fallback={"loading..."}>
            <PostsForCatchBlock preloadedQuery={loaderForCatchBlock.queryRef} />
          </Suspense>
        )}
      </section>
    </>
  );
}

function useQueryLoaderObj<T extends OperationType>(query: GraphQLTaggedNode) {
  const [queryRef, loadQuery, dispose] = useQueryLoader<T>(query);
  return useMemo(() => ({ queryRef, loadQuery, dispose }), [queryRef, loadQuery, dispose]);
}
