import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Fique Atualizado</h2>
          <p className="mb-8 text-muted-foreground">
            Assine nossa newsletter para receber as últimas tendências,
            lançamentos e ofertas exclusivas em arte digital.
          </p>
          <form className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Seu endereço de e-mail"
              className="grow"
            />
            <Button
              type="submit"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Assinar
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
