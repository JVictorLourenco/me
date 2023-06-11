import "../global.css";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "João Lourenço Portfolio",
    template: "%s | jlourenco.com",
  },
  description: "Software engineer at Cleverti",
  openGraph: {
    title: "jlourenco.com",
    description: "Software engineer at Cleverti",
    url: "https://jlourenco.com",
    siteName: "jlourenco.com",
    images: [
      {
        url: "https://chronark.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "João Lourenco Portfolio",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
