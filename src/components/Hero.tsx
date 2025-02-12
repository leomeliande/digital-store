import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] items-center overflow-hidden bg-secondary">
      <div className="container z-10 mx-auto px-4 text-foreground">
        <h1 className="mb-4 text-5xl font-bold md:text-7xl">
          Iluminando a <span className="highlight">Criatividade Digital</span>
        </h1>
        <p className="mb-8 max-w-2xl text-xl md:text-2xl">
          Descubra, compre e venda arte digital deslumbrante no marketplace mais
          inovador da web
        </p>
        <div className="space-x-4">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Explorar Lumo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Comece a Criar
          </Button>
        </div>
      </div>
    </section>
  );
}
