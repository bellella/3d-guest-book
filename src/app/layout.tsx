import type { Metadata } from "next";
import "./globals.css";
import Providers from "./_components/Providers";
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "🩷🩷🩷",
  description: "Buy me a coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
