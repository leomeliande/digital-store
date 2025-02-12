import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PERKS_FOR_BUYERS, PERKS_FOR_SELLERS } from "@/config";
import Products from "@/components/Products";
import ProductReel from "@/components/ProductReel";
import SellYourArt from "@/components/SellYourArt";
import Newsletter from "@/components/Newsletter";
import FeaturedArtist from "@/components/FeaturedArtist";
import Hero from "@/components/Hero";

const testimonials = [
  {
    name: "João Silva",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    text: "Excelente plataforma! Consegui vender meus produtos rapidamente e com segurança.",
  },
  {
    name: "Pedro Santos",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "Comprei uma arte linda para minha sala de estar. O processo de compra foi muito simples.",
  },
  {
    name: "Maria Oliveira",
    image: "https://randomuser.me/api/portraits/women/78.jpg",
    text: "Adorei a variedade de produtos disponíveis. Comprei um presente para minha amiga e ela adorou.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <ProductReel
        query={{ sort: "desc", limit: 4 }}
        title="Novos produtos"
        href="/products"
      />

      <div className="flex flex-col items-center py-20">
        <h2 className="text-4xl font-bold text-gray-900">
          Produtos em destaque
        </h2>
        <p className="mt-4 text-muted-foreground">
          Confira nosso mural de produtos em destaque.
        </p>

        <Products />
      </div>

      <section className="bg-secondary-foreground py-20 text-white">
        <Wrapper>
          <h2 className="mb-10 text-center text-4xl font-bold">
            O que nossos <span className="text-secondary">clientes</span> dizem
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-white p-1 shadow-lg">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-center">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <Wrapper className="py-20">
          <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
            Para <span className="text-primary">artistas</span>
          </h2>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {PERKS_FOR_SELLERS.map((perk, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-lg">
                  <perk.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {perk.name}
                </h3>
                <p className="text-center text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>

          <div className="my-12 h-px w-full bg-gray-200"></div>

          <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
            Para <span className="text-primary">compradores</span>
          </h2>

          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {PERKS_FOR_BUYERS.map((perk, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-lg">
                  <perk.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {perk.name}
                </h3>
                <p className="text-center text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <section className="bg-primary py-20 text-white">
        <Wrapper>
          <h2 className="mb-10 text-center text-4xl font-bold">
            Junte-se à nossa <span className="text-secondary">comunidade</span>
          </h2>
          <div className="flex flex-col items-center space-y-6">
            <p className="text-center text-lg">
              Participe de eventos, workshops e muito mais. Conecte-se com
              outros artistas e compradores.
            </p>
            <Button variant="secondary" size="lg">
              Saiba mais
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-white p-1 shadow-lg">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Event"
                  width={160}
                  height={160}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">
                Workshop de Design Digital
              </h3>
              <p className="text-center">
                Aprenda técnicas de design digital com especialistas renomados.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-white p-1 shadow-lg">
                <Image
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Event"
                  width={160}
                  height={160}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Feira de Artes Digitais</h3>
              <p className="text-center">
                Exponha e venda suas artes digitais em nossa feira anual.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-white p-1 shadow-lg">
                <Image
                  src="https://randomuser.me/api/portraits/men/12.jpg"
                  alt="Event"
                  width={160}
                  height={160}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Encontro de Criadores</h3>
              <p className="text-center">
                Conecte-se com outros criadores e compartilhe experiências sobre
                fontes e assets digitais.
              </p>
            </div>
          </div>
        </Wrapper>
      </section>

      <section className="border-t border-gray-200 bg-gray-50">
        <Wrapper className="py-20">
          <h2 className="mb-10 text-center text-4xl font-bold text-gray-900">
            <span className="text-primary">Como</span> funciona?
          </h2>

          <div className="flex flex-col space-y-12">
            {[
              {
                step: 1,
                title: "Crie Sua Conta",
                description:
                  "Cadastre-se gratuitamente e configure seu perfil em poucos minutos.",
                icon: "📝", // Example placeholder icon, replace with your appropriate JSX or component
              },
              {
                step: 2,
                title: "Envie Suas Artes",
                description:
                  "Suba suas artes digitais e configure preços e condições de venda.",
                icon: "📤", // Example placeholder icon, replace with your appropriate JSX or component
              },
              {
                step: 3,
                title: "Conecte-se com Compradores",
                description:
                  "Venda diretamente para compradores através de nossa plataforma.",
                icon: "🔗", // Example placeholder icon, replace with your appropriate JSX or component
              },
            ].map((step) => (
              <div key={step.step} className="flex items-center space-x-4">
                <div className="bg-primary-light flex h-16 w-16 items-center justify-center rounded-full text-xl text-white shadow-lg">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>

      <FeaturedArtist />
      <SellYourArt />
      <Newsletter />
    </>
  );
}
