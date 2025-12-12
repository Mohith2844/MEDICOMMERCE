import { useState } from "react";
import { Search, AlertTriangle, Leaf, ShieldCheck, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import diseases from "@/data/diseases.json";
import type { Disease } from "@/lib/symptomAnalyzer";

export function DiseaseDetails() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiseases = (diseases as Disease[]).filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.symptoms.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      disease.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="diagnosis" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading text-primary mb-4">
            Health Conditions Database
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse our comprehensive database of conditions, symptoms, and recommended care
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conditions, symptoms, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pr-2">
          {filteredDiseases.slice(0, 12).map((disease, index) => (
            <div
              key={disease.name}
              className="bg-card rounded-xl border shadow-card p-5 card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{disease.name}</h3>
                <Badge
                  variant={disease.severity === "serious" ? "destructive" : "secondary"}
                  className="shrink-0"
                >
                  {disease.severity}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {disease.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Stethoscope className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Specialty</span>
                    <p className="text-sm">{disease.specialty}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Symptoms</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {disease.symptoms.slice(0, 4).map((symptom, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                      {disease.symptoms.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{disease.symptoms.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Leaf className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Diet Plan</span>
                    <p className="text-sm">{disease.diet_plan}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Precautions</span>
                    <ul className="text-sm list-disc list-inside">
                      {disease.precautions.slice(0, 2).map((p, i) => (
                        <li key={i} className="text-muted-foreground">{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No conditions found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}
