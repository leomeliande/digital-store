"use client";

import React, { useState, useMemo } from "react";
import { TQueryValidator } from "@/lib/validators/query-validator";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import Image from "next/image";

const FALLBACK_LIMIT = 4;

export default function ProductsPage() {
  const query = { sort: "desc", limit: 4 };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { data: queryResults, error } =
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

  const ProductItem = React.memo(({ product }: { product: Product }) => {
    const validUrls = product.images
      .map(({ image }) => (typeof image === "string" ? image : image.url))
      .filter(Boolean) as string[];

    return (
      <div key={product.id} className="bg-card rounded-lg p-4 shadow-md">
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
        <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
        <p className="text-muted-foreground mb-2">
          {typeof product.user === "object"
            ? product.user?.email
            : product.user}
        </p>
        <p className="text-accent mb-2 font-bold">
          {formatPrice(product.price)}
        </p>
        <p className="mb-4 text-sm">{product.categories}</p>

        <Link href={`/products/${product.id}`}>
          <Button className="w-full">Ver Detalhes</Button>
        </Link>
      </div>
    );
  });

  ProductItem.displayName = "ProductItem";

  const ProductList = useMemo(() => {
    if (error) {
      return <div>Erro ao carregar produtos</div>;
    }

    const displayProducts =
      filteredProducts.length > 0 ? filteredProducts : products;

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {displayProducts?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    );
  }, [error, products, filteredProducts, ProductItem]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterProducts(term, categoryFilter);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    filterProducts(searchTerm, value);
  };

  const filterProducts = (term: string, category: string) => {
    if (!products) return;

    if (!term && (!category || category === "all")) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(term.toLowerCase());
      const categoryMatch =
        !category || category === "all"
          ? true
          : product.categories?.toLowerCase().includes(category.toLowerCase());
      return nameMatch && categoryMatch;
    });

    setFilteredProducts(filtered);
  };

  const uniqueCategories = useMemo(() => {
    if (!products) return [];

    const categories = products.map((product) => product.categories);
    return [...new Set(categories)];
  }, [products]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");

    setFilteredProducts([]);
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Produtos</h1>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={handleSearch}
          className="md:w-1/3"
        />

        <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {uniqueCategories?.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} className="md:w-1/3">
          Limpar Filtros
        </Button>
      </div>

      {ProductList}
    </div>
  );
}
