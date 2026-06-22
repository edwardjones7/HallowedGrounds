import { Hero } from "@/components/home/Hero";
import { LocationSelector } from "@/components/home/LocationSelector";
import { DifferenceStrip } from "@/components/home/DifferenceStrip";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { CateringBand } from "@/components/home/CateringBand";
import { SocialProof } from "@/components/home/SocialProof";
import { Marquee } from "@/components/ui/Marquee";
import { DownloadJoe } from "@/components/ui/DownloadJoe";
import { LocalBusinessSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <Marquee
        items={[
          "Roasted In-House",
          "Seed-Oil Free",
          "House-Made Daily",
          "Local Farms",
          "Tallow-Fried",
        ]}
        className="border-y border-brass/15 bg-ink-soft py-6"
      />
      <LocationSelector />
      <DifferenceStrip />
      <MenuTeaser />
      <CateringBand />
      <SocialProof />
      <DownloadJoe />
    </>
  );
}
