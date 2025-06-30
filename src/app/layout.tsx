"use client";
import "../styles/globals.css";
import { AppProvider } from "@/components/AppProvider";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}