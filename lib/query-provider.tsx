"use client"

import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "@tanstack/react-query"

const queryClient = new QueryClient()

export const QueryProvider = (props: Omit<QueryClientProviderProps, "client">) => (
  <QueryClientProvider {...props} client={queryClient} />
)
