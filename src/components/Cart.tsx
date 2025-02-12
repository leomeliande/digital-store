"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const transactionFee = 1;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="bg-accent text-accent-foreground absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Carrinho ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col space-y-4 pr-6">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 pr-6">
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
                <div className="flex font-semibold">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(subtotal + transactionFee)}</span>
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href="/checkout"
                  className={buttonVariants({ className: "mt-auto w-full" })}
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
              className="text-muted-foreground relative mb-4 h-60 w-60"
            >
              <Image
                src="/empty-cart.png"
                alt="Carrinho vazio"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="text-xl font-semibold">Seu carrinho está vazio</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-muted-foreground text-sm",
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
}

export default Cart;
