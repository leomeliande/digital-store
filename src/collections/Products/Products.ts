import { PRODUCT_CATEGORIES } from "@/config";
import { Product, User } from "@/payload-types";
import { CollectionBeforeChangeHook, CollectionConfig } from "payload";

const addUser: CollectionBeforeChangeHook<Product> = ({ req, data }) => {
  const user = req.user as User;

  return { ...data, user: user?.id };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  // access: {
  //   read: () => true,
  //   create: ({ req }) => req.user?.role === "admin",
  //   update: ({ req }) => req.user?.role === "admin",
  //   delete: ({ req }) => req.user?.role === "admin",
  // },
  hooks: {
    beforeChange: [addUser],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Descrição do produto",
      type: "richText",
      localized: true,
    },
    {
      name: "price",
      label: "Preço (R$)",
      type: "number",
      min: 0,
      max: 1000000,
      required: true,
    },
    {
      name: "categories",
      label: "Categoria",
      type: "select",
      required: true,
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
        label,
        value,
      })),
    },
    {
      name: "product_files",
      label: "Arquivo(s) do produto",
      type: "relationship",
      relationTo: "product_files",
      required: true,
      hasMany: false,
    },
    {
      name: "approved_for_sales",
      label: "Status do produto",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
        read: ({ req }) => req.user?.role === "admin",
      },
      options: [
        {
          label: "Pendente",
          value: "pending",
        },
        {
          label: "Aprovado",
          value: "approved",
        },
        {
          label: "Reprovado",
          value: "rejected",
        },
      ],
    },
    {
      name: "price_id",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripe_id",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Imagens do produto",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Imagem",
        plural: "Imagens",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
