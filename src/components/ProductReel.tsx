"use client";

import { trpc } from "@/lib/trpc";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import Link from "next/link";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery<
      {
        products: Product[];
        nextPage?: number;
      },
      Error
    >(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  return (
    <section className="py-12">
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="text-muted-foreground mt-2 text-sm">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="text-primary hidden text-sm font-medium hover:text-blue-700 md:block"
          >
            Ver coleção <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex w-full items-center">
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
