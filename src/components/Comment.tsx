import { ErrorBoundary } from "react-error-boundary";
import { useFragment, graphql } from "react-relay";
import type { Comment_comment$key } from "./__generated__/Comment_comment.graphql";
import type { CommentChild_comment$key } from "./__generated__/CommentChild_comment.graphql";

const childFragment = graphql`
  fragment CommentChild_comment on Comment @throwOnFieldError {
    # strictField
    # nullableField
    semanticNonNullField
  }
`;

const fragment = graphql`
  fragment Comment_comment on Comment {
    id
    body
    ...CommentChild_comment
  }
`;

type Props = {
  readonly comment: Comment_comment$key;
};

export function Comment({ comment }: Props) {
  const data = useFragment(fragment, comment);

  return (
    <div>
      <p>{data.body}</p>
      <ErrorBoundary fallback={<div style={{ color: "#dd4444" }}>Child Component's field error!</div>}>
        <Child comment={data} />
      </ErrorBoundary>
    </div>
  );
}

export function Child({ comment }: { readonly comment: CommentChild_comment$key }) {
  const data = useFragment(childFragment, comment);
  return data.semanticNonNullField;
}
