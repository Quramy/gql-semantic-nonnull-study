import { ErrorBoundary } from "react-error-boundary";
import { useFragment, graphql } from "react-relay";
import type { ErrorCatchBlock_Comment$key } from "./__generated__/ErrorCatchBlock_Comment.graphql";
import type { ErrorCatchBlock_Child_Comment$key } from "./__generated__/ErrorCatchBlock_Child_Comment.graphql";

type Result<T, S> =
  | {
      readonly ok: true;
      readonly value: T;
    }
  | {
      readonly ok: false;
      readonly value: S;
    };

const fragment = graphql`
  fragment ErrorCatchBlock_Comment on Comment {
    id
    body
    # strictField @catch
    nullableField @catch
    semanticNonNullField @catch
  }
`;

type Props = {
  readonly comment: ErrorCatchBlock_Comment$key;
};

export function ErrorCatchBlock({ comment }: Props) {
  const data = useFragment(fragment, comment);
  const semanticNonNullField = data.nullableField as Result<string | null, readonly unknown[]>;

  return (
    <div>
      <p>{data.body}</p>
      {semanticNonNullField.ok ? semanticNonNullField.value : <p style={{ color: "red" }}>error!</p>}
    </div>
  );
}
