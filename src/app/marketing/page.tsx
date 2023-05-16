"use client";
import CallToAction from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";
import Hero from "@/components/marketing/hero";
import Testimonial from "@/components/marketing/testimonial";
import Waitlist from "@/components/marketing/waitlist";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showWaitlistSignup, setShowWaitlistSignup] = useState(false);

  return (
    <main className="">
      <Waitlist open={showWaitlistSignup} setOpen={setShowWaitlistSignup} />
      <Hero
        showWaitlistSignup={showWaitlistSignup}
        setShowWaitlistSignup={setShowWaitlistSignup}
      />
      <CallToAction />
      <Testimonial />
      <Footer />
    </main>
  );
}
