import { ErrorBoundary } from "react-error-boundary";
import { useFragment, graphql } from "react-relay";
import type { ErrorThrowBlock_Comment$key } from "./__generated__/ErrorThrowBlock_Comment.graphql";
import type { ErrorThrowBlock_Child_Comment$key } from "./__generated__/ErrorThrowBlock_Child_Comment.graphql";

const childFragment = graphql`
  fragment ErrorThrowBlock_Child_Comment on Comment @throwOnFieldError {
    # strictField
    # nullableField
    semanticNonNullField
  }
`;

function Child({ comment }: { readonly comment: ErrorThrowBlock_Child_Comment$key }) {
  const data = useFragment(childFragment, comment);
  return data.semanticNonNullField;
}

const fragment = graphql`
  fragment ErrorThrowBlock_Comment on Comment {
    id
    body
    ...ErrorThrowBlock_Child_Comment
  }
`;

type Props = {
  readonly comment: ErrorThrowBlock_Comment$key;
};

export function ErrorThrowBlock({ comment }: Props) {
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
