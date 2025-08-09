// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WebOS – Your Personal Web-Based Operating System",
  description:
    "WebOS is a customizable, interactive web-based desktop experience. Access apps, manage files, and personalize your digital environment—all from your browser.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
