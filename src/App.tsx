import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay";
import { Store, Environment, Network, Observable, RecordSource } from "relay-runtime";
import { Home } from "./components/Home";

function fallbackRender({ error }: FallbackProps) {
  if (error instanceof Error) {
    return (
      <div>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    );
  } else if (typeof error === "string") {
    return (
      <div>
        <pre>{error}</pre>
      </div>
    );
  }
  return (
    <div>
      <p>Unexpected error occurs</p>
    </div>
  );
}

function createEnvironment() {
  const network = Network.create((params, variables) => {
    const response = fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });
    return Observable.from(response.then(data => data.json()));
  });

  const store = new Store(new RecordSource());

  return new Environment({ store, network });
}

const environment = createEnvironment();

export default function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <RelayEnvironmentProvider environment={environment}>
        <Home />
      </RelayEnvironmentProvider>
    </ErrorBoundary>
  );
}
