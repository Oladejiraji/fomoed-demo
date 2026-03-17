"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function Layout(props: IProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
