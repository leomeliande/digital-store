import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/trpc/trpc";

export const trpc = createTRPCReact<AppRouter>();

export const getTrpcClient = () =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

export const client = getTrpcClient();
