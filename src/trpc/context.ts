import { getPayload } from "payload";
import config from "@payload-config";
import type { NextApiRequest, NextApiResponse } from "next";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const payloadInstance = await getPayload({ config });

  return {
    payload: payloadInstance,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
