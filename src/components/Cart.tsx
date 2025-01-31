"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export const Cart = () => {
  const itemCount = 0;
  const transactionFee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />

        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Carrinho (0)</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO: Cart logic */}
              Itens no carrinho
            </div>

            <div className="space-y-4 pr-6">
              <Separator />

              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Envio</span>
                  <span>Grátis</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Taxa de transação</span>
                  <span>{formatPrice(transactionFee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(transactionFee)}</span>
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href="/cart"
                  className={buttonVariants({
                    className: "mt-auto w-full",
                  })}
                >
                  Continuar para pagamento
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/empty-cart.png"
                alt="Carrinho vazio"
                fill
                objectFit="contain"
              />
            </div>

            <div className="text-xl font-semibold">Seu carrinho está vazio</div>

            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Adicionar produtos ao carrinho
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
