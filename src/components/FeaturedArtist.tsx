import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FeaturedArtist() {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Artista em Destaque
        </h2>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Artista em Destaque"
              width={400}
              height={400}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="mb-4 text-2xl font-semibold text-foreground">
              Nova Lux
            </h3>
            <p className="mb-6 text-muted-foreground">
              Nova Lux é uma artista digital visionária, famosa por suas
              criações futuristas e psicodélicas. Seu trabalho combina elementos
              de ficção científica com uma paleta de cores vibrante e
              hipnotizante.
            </p>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Explorar Galeria de Nova Lux
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
