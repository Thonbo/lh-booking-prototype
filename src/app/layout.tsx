import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEGO House – Book Your Visit",
  description: "Book your LEGO House experience – zones, LEGO Masters Academy, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
