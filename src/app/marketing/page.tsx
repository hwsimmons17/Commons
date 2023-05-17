"use client";
import CallToAction from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";
import Hero from "@/components/marketing/hero";
import Testimonial from "@/components/marketing/testimonial";
import Waitlist from "@/components/marketing/waitlist";
import Notification from "@/components/marketing/notification";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showWaitlistSignup, setShowWaitlistSignup] = useState(false);
  const [waitlistError, setWaitlistError] = useState<string | undefined>();
  const [showNotification, setShowNotification] = useState(false);

  const setError = async (error: string | undefined) => {
    setShowWaitlistSignup(false);
    setWaitlistError(error);
    setShowNotification(true);
    await new Promise((r) => setTimeout(r, 3000));

    setShowNotification(false);
  };

  return (
    <main className="">
      <Waitlist
        open={showWaitlistSignup}
        setOpen={setShowWaitlistSignup}
        setError={setError}
      />
      <Hero
        showWaitlistSignup={showWaitlistSignup}
        setShowWaitlistSignup={setShowWaitlistSignup}
      />
      <CallToAction />
      <Testimonial />
      <Footer />
      <Notification
        error={waitlistError}
        show={showNotification}
        setShow={setShowNotification}
      />
    </main>
  );
}
