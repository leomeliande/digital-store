"use client";

import React from "react";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams?.get("as") === "seller";
  const origin = searchParams?.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    mode: "onBlur",
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");

      if (origin) {
        router.push(`/${origin}`);

        return;
      }

      if (isSeller) {
        router.push("/admin");

        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("E-mail ou senha incorretos");
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative mx-auto flex flex-col items-center justify-center px-5 pt-20 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20 text-blue-500" />

            <h1 className="text-2xl font-bold">
              Entrar na sua conta {isSeller ? "de vendedor" : ""}
            </h1>

            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Não tem tem uma conta? Crie uma
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    required
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Entrar</Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ou
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                variant="secondary"
                onClick={continueAsBuyer}
                disabled={isLoading}
              >
                Entrar como cliente
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={continueAsSeller}
                disabled={isLoading}
              >
                Entrar como vendedor
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
