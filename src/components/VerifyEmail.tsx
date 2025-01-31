"use client";

import { trpc } from "@/lib/trpc";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <XCircle className="h-12 w-12 text-red-500" />
        <h3 className="text-xl font-semibold">Ocorreu um problema</h3>
        <p className="text-sm text-muted-foreground">
          O código de verificação é inválido ou expirou. Por favor, solicite um
          novo link de verificação.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src="/hippo-email-sent.png"
            fill
            objectFit="contain"
            alt="Email enviado"
          />
        </div>

        <h3 className="text-2xl font-semibold">Tudo pronto!</h3>
        <p className="mt-1 text-center text-muted-foreground">
          Obrigado por verificar seu e-mail.
        </p>

        <Link href="/sign-in" className={buttonVariants({ className: "mt-4" })}>
          Entrar
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Loader2 className="h-12 w-12 animate-spin text-zinc-300" />
        <h3 className="text-xl font-semibold">Verificando...</h3>
        <p className="text-sm text-muted-foreground">
          Esse processo pode levar alguns segundos.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
