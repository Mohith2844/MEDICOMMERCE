import diseases from "@/data/diseases.json";

export interface Disease {
  name: string;
  symptoms: string[];
  severity: "mild" | "serious";
  description: string;
  specialty: string;
  diet_plan: string;
  precautions: string[];
}

export interface AnalysisResult {
  disease: Disease;
  matchedSymptoms: string[];
  confidence: number;
}

export function analyzeSymptoms(userText: string): AnalysisResult[] {
  const normalizedText = userText.toLowerCase();
  const results: AnalysisResult[] = [];

  for (const disease of diseases as Disease[]) {
    const matchedSymptoms: string[] = [];

    for (const symptom of disease.symptoms) {
      const symptomWords = symptom.toLowerCase().split(" ");
      const hasMatch = symptomWords.some((word) => 
        word.length > 3 && normalizedText.includes(word)
      ) || normalizedText.includes(symptom.toLowerCase());

      if (hasMatch) {
        matchedSymptoms.push(symptom);
      }
    }

    if (matchedSymptoms.length > 0) {
      const confidence = Math.min(
        Math.round((matchedSymptoms.length / disease.symptoms.length) * 100),
        95
      );

      results.push({
        disease,
        matchedSymptoms,
        confidence,
      });
    }
  }

  return results
    .sort((a, b) => {
      if (b.matchedSymptoms.length !== a.matchedSymptoms.length) {
        return b.matchedSymptoms.length - a.matchedSymptoms.length;
      }
      return b.confidence - a.confidence;
    })
    .slice(0, 5);
}

export function getSeverityColor(severity: string): string {
  return severity === "serious" ? "destructive" : "warning";
}
