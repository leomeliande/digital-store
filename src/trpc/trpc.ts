import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import { authRouter } from "./auth-router";
import { z } from "zod";
import { QueryValidator } from "@/lib/validators/query-validator";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
  auth: authRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, query } = input;
      const { sort, limit, ...queryOpts } = query;

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = { equals: value };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await ctx.payload.find({
        collection: "products",
        where: {
          approved_for_sales: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),

  getProducts: publicProcedure.query(async ({ ctx }) => {
    try {
      const products = await ctx.payload.find({
        collection: "products",
        limit: 10,
      });

      return products.docs;
    } catch (error: any) {
      throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
  }),

  getProductsById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const product = await ctx.payload.findByID({
        collection: "products",
        id: input,
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      return product;
    }),
});

export type AppRouter = typeof appRouter;
