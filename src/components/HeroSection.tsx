import { Button } from "@/components/ui/button";
import { SymptomChecker } from "@/components/SymptomChecker";
import { Stethoscope, Calendar, Shield, Clock, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium">
              <Shield className="h-4 w-4" />
              AI-Powered Healthcare Platform
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading leading-tight">
              Your Complete{" "}
              <span className="text-primary">Health & Wellness</span>{" "}
              Solution
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Get instant AI-powered symptom analysis, personalized nutrition
              recommendations, and secure access to medicines and lab tests — all
              in one HIPAA-compliant platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl">
                <Stethoscope className="h-5 w-5" />
                Start Symptom Check
              </Button>
              <Button variant="outline" size="xl">
                <Calendar className="h-5 w-5" />
                Book Consultation
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">2M+</span>
                </div>
                <p className="text-sm text-muted-foreground">Users Trust</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">24/7</span>
                </div>
                <p className="text-sm text-muted-foreground">AI Support</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">HIPAA</span>
                </div>
                <p className="text-sm text-muted-foreground">Compliant</p>
              </div>
            </div>
          </div>

          {/* Right Content - Symptom Checker */}
          <div className="lg:sticky lg:top-24 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SymptomChecker />
          </div>
        </div>
      </div>
    </section>
  );
}
