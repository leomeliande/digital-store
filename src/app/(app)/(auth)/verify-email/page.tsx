import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: PageProps) => {
  const { token, to: toEmail } = await searchParams;

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                objectFit="contain"
                alt="Email sent"
              />
            </div>

            <h3 className="text-2xl font-semibold">Verifique seu e-mail</h3>

            {toEmail ? (
              <p className="text-center text-muted-foreground">
                Enviamos um e-mail para{" "}
                <span className="font-semibold">{toEmail}</span> com um link de
                verificação.
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                Enviamos um e-mail com um link de verificação para seu e-mail.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
