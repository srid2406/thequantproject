import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Quant Project - Quantitative Trading",
  description: "Quantitative Trading. Algorithmic Precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="bg-black/50 backdrop-blur-sm py-6 text-center border-t border-purple-900/30">
          <p className="text-gray-400">
            © {new Date().getFullYear()} The Quant Project
          </p>
        </footer>
      </body>
    </html>
  );
}
