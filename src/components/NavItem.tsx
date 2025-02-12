import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  isOpen: boolean;
  onOpen: () => void;
  isAnyOpen: boolean;
}

const NavItem = ({ category, isAnyOpen, onOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          onClick={onOpen}
          variant={isOpen ? "secondary" : "ghost"}
          className="gap-1.5"
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-all", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "slide-in from-top-5 animate-in fade-in-10": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow-sm"
            aria-hidden="true"
          />

          <div className="relative rounded-md bg-white shadow-lg">
            <div className="max-w-7x1 mx-auto px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="Imagem de categoria do produto"
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <Link
                        href={item.href}
                        className="mt-4 block font-semibold text-gray-900"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1" aria-hidden="true">
                        Compre agora
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
