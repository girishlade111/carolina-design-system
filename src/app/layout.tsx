import type { Metadata } from "next";
import { Public_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carolina Design System",
  description:
    "Implementation-ready, token-driven design-system guidance for Carolina. Foundations, components, accessibility, and QA for documentation site interfaces.",
  keywords: [
    "Carolina",
    "design system",
    "design tokens",
    "accessibility",
    "WCAG 2.2",
    "documentation",
    "component library",
  ],
  authors: [{ name: "Carolina" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Carolina Design System",
    description:
      "Token-driven, accessibility-first design-system guidance for documentation site interfaces.",
    siteName: "Carolina",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carolina Design System",
    description:
      "Token-driven, accessibility-first design-system guidance for documentation site interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${publicSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
