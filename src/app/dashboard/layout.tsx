import React, { ReactNode } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface IProps {
  children: ReactNode;
}

export default function Layout(props: IProps) {
  const { children } = props;

  return (
    <div className="w-full h-screen overflow-hidden flex bg-[#1A1A1A]">
      <Sidebar />
      <div className="flex-1 border border-[#222222] mt-1 rounded-xl">
        <Header />
        {children}
      </div>
    </div>
  );
}
