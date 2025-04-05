import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TeddyVerse",
  description: "Created With Love By Rhydham",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         {<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <ConvexClientProvider>
	        {children}
          <Toaster />
          </ConvexClientProvider>
          </ThemeProvider>
}
      </body>
    </html>
  );
}
