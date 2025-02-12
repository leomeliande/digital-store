import { Button } from "@/components/ui/button";

export default function SellYourArt() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Ilumine o Mundo com Sua Arte
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Junte-se à comunidade Lumo e comece a vender suas criações digitais.
          Alcance milhares de colecionadores e transforme sua paixão em sucesso.
        </p>
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Comece a Brilhar no Lumo
        </Button>
      </div>
    </section>
  );
}
