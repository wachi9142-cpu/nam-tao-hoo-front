import { About } from "@/components/landing/About";
import { CheckIn } from "@/components/landing/CheckIn";
import { CustomerPhotos } from "@/components/landing/CustomerPhotos";
import { Hero } from "@/components/landing/Hero";
import { Hours } from "@/components/landing/Hours";
import { Location } from "@/components/landing/Location";
import { Menu } from "@/components/landing/Menu";
import { Nearby } from "@/components/landing/Nearby";
import { Reviews } from "@/components/landing/Reviews";
import { Sections } from "@/components/landing/Sections";
import { Story } from "@/components/landing/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Sections />
      <About />
      <Menu />
      <Hours />
      <Location />
      <Reviews />
      <CustomerPhotos />
      <CheckIn />
      <Nearby />
      <Story />
    </main>
  );
}
