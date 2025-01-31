import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
