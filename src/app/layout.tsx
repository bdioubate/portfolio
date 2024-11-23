//next
import type { Metadata } from "next";
import Script from "next/script";

//css
import "./style.css";

//redux
import { Providers } from "./GlobalRedux/provider";

export const metadata: Metadata = {
  title: "Bangali DIOUBATE - Portfolio",
  description: "Découvrez le portfolio de Bangali DIOUBATE...", 
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PYCJMB11VS"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PYCJMB11VS');
          `}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}