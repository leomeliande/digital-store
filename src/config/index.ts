import {
  ArrowDownToLine,
  Leaf,
  MessageCircleQuestion,
  Server,
} from "lucide-react";

export const PRODUCT_CATEGORIES = [
  {
    label: "Destaque",
    value: "highlight" as const,
    featured: [
      {
        name: "Escolhas dos editores",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "Novos lançamentos",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Pré-venda",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
      {
        name: "Promoções",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "PC",
    value: "pc" as const,
    featured: [
      {
        name: "Steam",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "Epic Games",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "EA Play",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Consoles",
    value: "consoles" as const,
    featured: [
      {
        name: "PlayStation",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "Xbox",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Nintendo",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const PERKS_FOR_BUYERS = [
  {
    name: "Artes únicas e exclusivas",
    icon: Server,
    description: "Descubra talentos emergentes e obras raras.",
  },
  {
    name: "Experiência minimalista",
    icon: ArrowDownToLine,
    description: "Navegação fluida e compra simplificada.",
  },
  {
    name: "Segurança garantida",
    icon: MessageCircleQuestion,
    description: "Pagamentos protegidos e autenticidade garantida.",
  },
  {
    name: "Comunidade criativa",
    icon: Leaf,
    description:
      "Conecte-se diretamente com artistas e entusiastas de todo o mundo.",
  },
];

export const PERKS_FOR_SELLERS = [
  {
    name: "Sem complicação",
    icon: Server,
    description: "Publique e venda suas artes digitais com poucos cliques.",
  },
  {
    name: "Menos taxas, mais lucros",
    icon: ArrowDownToLine,
    description: "Tarifas justas para maximizar o seu lucro.",
  },
  {
    name: "Exposição global",
    icon: MessageCircleQuestion,
    description: "Alcance colecionadores e entusiastas do mundo todo.",
  },
  {
    name: "Controle total",
    icon: Leaf,
    description: "Defina seus preços e licenciamentos como preferir.",
  },
];
