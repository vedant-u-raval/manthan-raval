import About from "@/components/About";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProfessionalProfile from "@/components/ProfessionalProfile";
import { buildStructuredData } from "@/lib/structured-data";

export default function HomePage() {
  const jsonLd = buildStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can never break out of the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <ProfessionalProfile />
        <Gallery />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
