//next
import type { Metadata } from "next";

//redux
import { Providers } from "./GlobalRedux/provider";

//css
import "./style.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
