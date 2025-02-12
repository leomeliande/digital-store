import Link from "next/link";
import Wrapper from "./Wrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import { Cart } from "./Cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const nextCookies = await cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white shadow-md">
      <header className="relative bg-white">
        <Wrapper>
          <div>
            <div className="flex h-16 items-center">
              {/* TODO: Mobile */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-8 w-auto" />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Entrar
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Criar conta
                    </Link>
                  )}

                  {!user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {!user ? (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  ) : null}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </header>
    </div>
  );
};

export default Navbar;
