import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  auth: {
    maxLoginAttempts: 5,
    cookies: {
      secure: true,
    },
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Clique aqui para verificar seu e-mail</a>

          <p>Olá,</p>
          <p>Seu código de verificação é: <strong>${token}</strong></p>
          <p>Este código é válido por 15 minutos.</p>
        `;
      },
    },
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      admin: {
        condition: () => true,
      },
      type: "select",
      options: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Admin",
          value: "admin",
        },
      ],
    },
  ],
};
