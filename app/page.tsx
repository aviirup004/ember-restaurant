"use client";

import { Navigation } from "@/components/ember/navigation";
import { HeroSection } from "@/components/ember/hero-section";
import { StorySection } from "@/components/ember/story-section";
import { MenuSection } from "@/components/ember/menu-section";
import { CraftSection } from "@/components/ember/craft-section";
import { ExperienceSection } from "@/components/ember/experience-section";
import { ReservationsSection } from "@/components/ember/reservations-section";
import { Footer } from "@/components/ember/footer";
import { CustomCursor } from "@/components/ember/custom-cursor";
import { FireBackground } from "@/components/ember/fire-background";

export default function EmberRestaurant() {
  return (
    <main className="relative min-h-screen bg-transparent overflow-x-hidden">
      <CustomCursor />
      <FireBackground />
      <Navigation />
      <HeroSection />
      <StorySection />
      <MenuSection />
      <CraftSection />
      <ExperienceSection />
      <ReservationsSection />
      <Footer />
    </main>
  );
}
