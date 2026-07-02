import { Hero } from "@/components/hero";
import { Collage } from "@/components/collage";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { SideQuests } from "@/components/side-quests";
import { Tools } from "@/components/tools";
import { Footer } from "@/components/footer";
import { MenuPill } from "@/components/menu-pill";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Collage />
        <About />
        <Work />
        <SideQuests />
        <Tools />
      </main>
      <Footer />
      <MenuPill />
    </>
  );
}
