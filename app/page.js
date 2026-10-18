import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import Toaster from "@/components/Toaster";

export default function Home() {
  return (
    <>
      <a href="#about" className="skip-link">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette />
      <Toaster />
      <ClientEffects />
    </>
  );
}
