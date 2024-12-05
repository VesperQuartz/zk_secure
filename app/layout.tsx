import "./globals.css";
import { AsyncProvider } from "./provider/query-provider";
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import NProgressProviders from "./provider/loader-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen min-h-screen">
        <main className="flex-1">
          <AsyncProvider>
            <NuqsAdapter>
              <NProgressProviders>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </NProgressProviders>
            </NuqsAdapter>
          </AsyncProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
