import { Baskervville, Roboto } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Commons | A place for community",
  description: "A place for commerce and community",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baskervville",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${baskervville.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
