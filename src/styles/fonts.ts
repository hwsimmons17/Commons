import { Baskervville, Roboto } from "next/font/google";

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

export { roboto, baskervville };
