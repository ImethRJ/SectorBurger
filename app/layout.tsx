import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sector | Spiced. Stacked. Smashed. Gourmet Sri Lankan Burgers",
  description: "Experience the ultimate culinary collision: Gourmet smash burgers infused with the fiery, rich flavors of traditional Sri Lankan street food.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} font-sans antialiased bg-sector-offwhite text-sector-charcoal min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}