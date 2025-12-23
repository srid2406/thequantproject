import Hero from "../components/Hero";
import StarsCanvas from "../components/StarCanvas";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="main-content relative mt-0">
        <StarsCanvas />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}
