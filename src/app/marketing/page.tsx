import CallToAction from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";
import Header from "@/components/marketing/header";
import Hero from "@/components/marketing/hero";
import Testimonial from "@/components/marketing/testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <CallToAction />
      <Testimonial />
      <Footer />
    </main>
  );
}
