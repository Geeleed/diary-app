import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diary",
  description: "Generated by create next app",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" flex justify-center items-center">
      <head>
        <link rel="icon" href="/images/logo.svg" />
        <meta name="theme-color" content="#bfac97" />
      </head>
      <body className={inter.className + " sm:max-w-md min-w-80 bg-weight1 "}>
        {children}
      </body>
    </html>
  );
}
