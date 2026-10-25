import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#171E26",
};

export const metadata: Metadata = {
  title: "MM Siva Furniture — Luxury Solid Wood Furniture & Bespoke Interiors | Since 1998",
  description:
    "Tamil Nadu's premier solid wood atelier. Handcrafted Burma teak, Indian sheesham, and mango wood sofa sets, hydraulic storage beds, dining tables, and bespoke woodwork. 10-Year Warranty & Free Assembly.",
  keywords: "solid wood furniture, teak wood sofa, sheesham king bed, wooden dining table, custom furniture chennai, MM Siva furniture, luxury wooden furniture tamil nadu",
  openGraph: {
    title: "MM Siva Furniture — Luxury Solid Wood Furniture & Bespoke Interiors",
    description: "Handcrafted 100% solid wood furniture. Explore living, bedroom, and dining collections with factory-direct pricing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
