"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/payload-types";
import { trpc } from "@/lib/trpc";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const {
    data: foundProduct,
    isLoading,
    error,
  } = trpc.getProductsById.useQuery<Product>(id);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error || !foundProduct) {
    return notFound();
  }

  const handleAddToCart = () => {
    if (foundProduct) {
      addToCart(foundProduct, quantity);
      console.log(`Adicionado ao carrinho: ${quantity} x ${foundProduct.name}`);
    }
  };

  const renderDescription = (description: any) => {
    if (
      !description ||
      !description.root ||
      !Array.isArray(description.root.children)
    ) {
      return null;
    }

    return description.root.children.map((block: any) => {
      if (block.type === "paragraph" && Array.isArray(block.children)) {
        return block.children.map((child: any, childIndex: number) => {
          if (child.type === "text") {
            return <span key={childIndex}>{child.text}</span>;
          }
          return null;
        });
      }
      return null;
    });
  };

  const validUrls = foundProduct.images
    ? (foundProduct.images
        .map(({ image }) => (typeof image === "string" ? image : image.url))
        .filter(Boolean) as string[])
    : [];

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {validUrls.map((url) => (
          <Image
            key={url}
            src={url}
            alt={foundProduct.name}
            width={500}
            height={500}
            className="h-auto w-full rounded-lg shadow-md"
            layout="responsive"
          />
        ))}
      </div>

      <div>
        <h1 className="mb-4 text-3xl font-bold">{foundProduct.name}</h1>

        <p className="text-muted-foreground mb-2 text-xl">
          por{" "}
          {typeof foundProduct.user === "object"
            ? foundProduct.user?.email
            : foundProduct.user}
        </p>

        <p className="text-accent mb-4 text-2xl font-bold">
          {formatPrice(foundProduct.price)}
        </p>

        <p className="mb-4 text-sm">{foundProduct.categories}</p>

        <p className="mb-6">
          {renderDescription(foundProduct.description) || "Sem descrição"}
        </p>

        <div className="mb-4 flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </Button>
          <span>{quantity}</span>
          <Button variant="outline" onClick={() => setQuantity((q) => q + 1)}>
            +
          </Button>
        </div>

        <Button
          size="lg"
          className="w-full md:w-auto"
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
