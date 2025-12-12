import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { AnalysisResult } from "@/lib/symptomAnalyzer";

export function useSymptomHistory() {
  const { user } = useAuth();

  const saveSymptomCheck = async (symptoms: string[], results: AnalysisResult[]) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase.from("symptom_history").insert({
      user_id: user.id,
      symptoms,
      results: results.map((r) => ({
        disease: {
          name: r.disease.name,
          description: r.disease.description,
          severity: r.disease.severity,
        },
        confidence: r.confidence,
        matchedSymptoms: r.matchedSymptoms,
      })),
    });

    return { error };
  };

  return { saveSymptomCheck };
}
