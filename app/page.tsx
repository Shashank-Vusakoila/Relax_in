import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Membership } from "@/components/sections/Membership";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Experience />
      <Membership />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
