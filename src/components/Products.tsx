"use client";

import { trpc } from "@/lib/trpc";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import React, { useMemo } from "react";
import { Product } from "@/payload-types";
import Link from "next/link";

const ProductItem = React.memo(
  ({ product }: { product: Product; isLoading: boolean }) => {
    const validUrls = product.images
      .map(({ image }) => (typeof image === "string" ? image : image.url))
      .filter(Boolean) as string[];

    return (
      <li
        className="flex flex-1 flex-col items-center justify-center gap-4"
        key={product.id}
      >
        <Link href={`/product/${product.id}`}>
          {validUrls.map((url) => (
            <Image
              key={url}
              src={url || ""}
              alt={product.name}
              width={500}
              height={300}
              layout="responsive"
              className="relative mb-4 h-48 w-full overflow-hidden rounded-lg border-2 border-gray-100"
            />
          ))}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>{formatPrice(product.price)}</p>
        </Link>
      </li>
    );
  }
);

ProductItem.displayName = "ProductItem";

const ProductPlaceholder = () => (
  <li className="flex flex-1 flex-col items-center justify-center gap-4">
    <div className="relative mb-4 h-48 w-full animate-pulse overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-200" />
    <h3 className="h-6 w-32 animate-pulse rounded bg-gray-200"></h3>
    <p className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200"></p>
  </li>
);

const PlaceholderList = ({ length }: { length: number }) => (
  <ul className="flex w-full items-center justify-center gap-4">
    {Array.from({ length }).map((_, index) => (
      <ProductPlaceholder key={index} />
    ))}
  </ul>
);

const Products = () => {
  const { data, isLoading } = trpc.getProducts.useQuery();

  const productList = useMemo(() => {
    return data?.map((product: Product) => (
      <ProductItem key={product.id} product={product} isLoading={isLoading} />
    ));
  }, [data, isLoading]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-16">
      {isLoading ? (
        <>
          <PlaceholderList length={(data && data.length) || 3} />
        </>
      ) : (
        <ul className="flex gap-4">{productList}</ul>
      )}
    </div>
  );
};

export default Products;
