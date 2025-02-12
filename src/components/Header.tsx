import Link from "next/link";
import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eclipse } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { Cart } from "./Cart";

const Header = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <header className="bg-white shadow-xs">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-bold text-gray-800"
        >
          <Eclipse className="h-8 w-8 text-primary" />{" "}
          {/* using Eclipse icon as logo */}
          <span>Lumo</span>
        </Link>

        <nav className="hidden space-x-8 md:flex">
          <Link
            href="/products"
            className="text-foreground transition-colors hover:text-accent"
          >
            Produtos
          </Link>
          <Link
            href="/digital-art"
            className="text-foreground transition-colors hover:text-accent"
          >
            Arte Digital
          </Link>
          <Link
            href="/3d-assets"
            className="text-foreground transition-colors hover:text-accent"
          >
            Assets 3D
          </Link>
          <Link
            href="/fonts"
            className="text-foreground transition-colors hover:text-accent"
          >
            Fontes
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Cart />

          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Link href="/sign-in">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
