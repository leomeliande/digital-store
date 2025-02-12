"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, getTrpcClient } from "@/lib/trpc";
import { ReactNode, useState } from "react";
import { CartProvider } from "@/context/CartContext";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const trpcClient = getTrpcClient(); // Obtém o cliente tRPC

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
