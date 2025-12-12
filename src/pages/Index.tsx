import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DiseaseDetails } from "@/components/DiseaseDetails";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <DiseaseDetails />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
