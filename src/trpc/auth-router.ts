import { AuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { Context } from "./context";
import { TRPCError } from "@trpc/server";
import { initTRPC } from "@trpc/server";
//import type { Context as contextType } from "./context";
// import { generateVerificationCode } from "@/utils/generateCode";
// import { sendVerificationEmail } from "@/services/emailService";
import { z } from "zod";
import { User } from "@/payload-types";
import { cookies } from "next/headers";

const t = initTRPC.context<Context>().create();

type UserProps = {
  exp?: number;
  token?: string;
  user: User;
};

export const authRouter = t.router({
  createPayloadUser: t.procedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const payload = ctx.payload;

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This email is already in use. Sign in instead?",
        });
      }

      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return {
        success: true,
        sentToEmail: email,
      };
    }),

  verifyEmail: t.procedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input, ctx }) => {
      const { token } = input;
      const payload = ctx.payload;
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid verification code",
        });
      }

      return {
        success: true,
      };
    }),

  signIn: t.procedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { payload, res } = ctx;

      try {
        const user: UserProps = await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
        });

        if (user.token) {
          res.setHeader(
            "Set-Cookie",
            `payload-token=${user.token}; Path=/; HttpOnly; Secure; SameSite=Strict`
          );
        }

        return {
          success: true,
          user,
        };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }
    }),
});
