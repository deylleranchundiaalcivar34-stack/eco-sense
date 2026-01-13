// src/pages/Home.jsx
import HeroSection from "@/components/sections/HeroSection.jsx";
import AboutSection from "@/components/sections/AboutSection.jsx";
import Grifo3D from "@/components/sections/Grifo3D.jsx";
import ContactSection from "@/components/sections/ContactSection.jsx";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Grifo3D />
      <ContactSection />
    </>
  );
};

export default Home;