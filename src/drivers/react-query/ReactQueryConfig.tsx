import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryConfigProps } from "./entities/query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function ReactQueryConfig({ children }: ReactQueryConfigProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
