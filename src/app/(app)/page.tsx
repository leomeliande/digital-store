import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { PERKS_FOR_BUYERS, PERKS_FOR_SELLERS } from "@/config";
import Products from "@/components/Products";
import ProductReel from "@/components/ProductReel";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            <span className="text-primary">Seu</span> talento. <br />
            <span className="text-primary">Seu</span> espaço. <br />
            <span className="text-primary">Sua</span> arte.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            A melhor plataforma para artistas e criadores venderem seus
            produtos.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/products" className={buttonVariants()}>
              Ver produtos
            </Link>
            <Button variant="ghost">Por que nos escolher? →</Button>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="Novos produtos"
          href="/products"
        />

        <div className="flex flex-col items-center py-20">
          <h2 className="text-4xl font-bold text-gray-900">
            Produtos em destaque
          </h2>
          <p className="mt-4 text-muted-foreground">
            Confira nosso mural de produtos em destaque.
          </p>

          <Products />
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
            Para <span className="text-primary">artistas</span>
          </h2>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {PERKS_FOR_SELLERS.map((perk, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-lg">
                  <perk.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {perk.name}
                </h3>
                <p className="text-center text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>

          <div className="my-12 h-px w-full bg-gray-200"></div>

          <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
            Para <span className="text-primary">compradores</span>
          </h2>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {PERKS_FOR_BUYERS.map((perk, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-lg">
                  <perk.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {perk.name}
                </h3>
                <p className="text-center text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
