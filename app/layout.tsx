import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boda de Francisco y Veaney | 01 de Mayo del 2027",
  description: "Celebra con nosotros este día tan especial. Conoce la ubicación, nuestra historia y acompáñanos a festejar nuestra boda.",
  keywords: ["boda", "invitación", "evento", "francisco", "veaney", "matrimonio", "2027"],
  openGraph: {
    title: "Nuestra Boda - Francisco y Veaney",
    description: "Estás invitado a celebrar con nosotros el día más importante de nuestras vidas. 01 de Mayo del 2027.",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/assets/images/back&wihite.jpeg", // <--- Esta es la imagen que saldrá en WhatsApp
        width: 1200,
        height: 630,
        alt: "Francisco y Veaney",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
