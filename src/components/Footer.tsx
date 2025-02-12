import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">Lumo</h3>
            <p className="text-muted-foreground">
              Iluminando o caminho para artistas digitais brilharem e
              colecionadores descobrirem obras únicas.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-muted-foreground hover:text-accent"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-muted-foreground hover:text-accent"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-accent"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-muted-foreground hover:text-accent"
                >
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/digital-art"
                  className="text-muted-foreground hover:text-accent"
                >
                  Arte Digital
                </Link>
              </li>
              <li>
                <Link
                  href="/3d-assets"
                  className="text-muted-foreground hover:text-accent"
                >
                  Assets 3D
                </Link>
              </li>
              <li>
                <Link
                  href="/fonts"
                  className="text-muted-foreground hover:text-accent"
                >
                  Fontes
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-muted-foreground hover:text-accent"
                >
                  Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Lumo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
