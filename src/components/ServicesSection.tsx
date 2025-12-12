import { Stethoscope, UtensilsCrossed, Pill, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Stethoscope,
    title: "AI Diagnosis",
    description: "Get instant symptom analysis powered by advanced AI algorithms",
    action: "Try Now",
    href: "#diagnosis",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Plans",
    description: "Personalized nutrition recommendations based on your health profile",
    action: "Explore",
    href: "#nutrition",
  },
  {
    icon: Pill,
    title: "Medicines",
    description: "Order prescription and OTC medicines with secure delivery",
    action: "Shop Now",
    href: "#medicines",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description: "Book lab tests and get results online in 24-48 hours",
    action: "Book Test",
    href: "#lab-tests",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading text-primary mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to keep you healthy and informed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card rounded-xl border shadow-card p-6 card-hover flex flex-col items-center text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {service.description}
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href={service.href}>{service.action}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
