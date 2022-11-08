import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryConfigProps } from "./entities/query";

export default function ErrorBoundaries({
  children,
}: Pick<ReactQueryConfigProps, "children">) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              There was an error!
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
