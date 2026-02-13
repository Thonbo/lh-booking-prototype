import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEGO House — Book Your Visit",
  description: "Book tickets for LEGO House Experience Zones and Masterpiece Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
