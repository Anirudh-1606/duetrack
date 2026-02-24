import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DueTrack — Never Miss a Compliance Deadline Again",
  description:
    "One dashboard for ALL your Indian business compliance — GST, TDS, PF, ESI, ROC. Get WhatsApp alerts before deadlines hit. Free forever plan available.",
  keywords: [
    "GST compliance",
    "GST software India",
    "compliance tracker",
    "ClearTax alternative",
    "TDS filing",
    "PF ESI compliance",
    "ROC filing",
    "Indian business compliance",
    "GST deadline alerts",
    "compliance management",
  ],
  openGraph: {
    title: "DueTrack — Never Miss a Compliance Deadline Again",
    description:
      "One dashboard for ALL your Indian business compliance — GST, TDS, PF, ESI, ROC. Get alerts before deadlines hit.",
    type: "website",
    url: "https://duetrack.cipher.build",
  },
  twitter: {
    card: "summary_large_image",
    title: "DueTrack — Never Miss a Compliance Deadline Again",
    description:
      "One dashboard for ALL your Indian business compliance. Get WhatsApp alerts before deadlines hit.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
