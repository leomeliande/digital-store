// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { transporter } from "./services/emailService";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { Orders } from "./collections/Orders";

import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import { Products } from "./collections/Products/Products";
import { ProductFiles } from "./collections/ProductFiles";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  graphQL: {
    disable: false,
  },
  i18n: {
    supportedLanguages: { en, pt },
  },
  email: nodemailerAdapter({
    transport: transporter,
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "Lumo",
  }),
  admin: {
    meta: {
      title: "Lumo",
      titleSuffix: "| Custom CMS",
      description: "A custom CMS for Lumo",
      defaultOGImageType: "dynamic",
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Products, Media, Orders, ProductFiles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
