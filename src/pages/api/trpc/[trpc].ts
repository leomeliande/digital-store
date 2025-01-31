import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/trpc/trpc";
import { createContext } from "@/trpc/context";

export default createNextApiHandler({
  router: appRouter,
  createContext: ({ req, res }) => createContext({ req, res }),
});
