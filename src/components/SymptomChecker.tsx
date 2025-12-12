import { useState } from "react";
import { Sparkles, AlertCircle, CheckCircle, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeSymptoms, AnalysisResult } from "@/lib/symptomAnalyzer";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useSymptomHistory } from "@/hooks/useSymptomHistory";
import { useToast } from "@/hooks/use-toast";

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const { user } = useAuth();
  const { saveSymptomCheck } = useSymptomHistory();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setHasSaved(false);
    // Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const analysisResults = analyzeSymptoms(symptoms);
    setResults(analysisResults);
    setHasAnalyzed(true);
    setIsAnalyzing(false);
  };

  const handleSaveToHistory = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your symptom history.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const symptomList = symptoms.split(/[,\s]+/).filter((s) => s.trim());
    const { error } = await saveSymptomCheck(symptomList, results);

    if (error) {
      toast({
        title: "Save failed",
        description: "Could not save to history. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Saved!",
        description: "Symptom check saved to your history.",
      });
      setHasSaved(true);
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft border p-6 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="font-medium">Quick Symptom Checker</span>
      </div>

      <Textarea
        placeholder="Describe your symptoms (e.g., headache, fever, fatigue)..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="min-h-[100px] resize-none border-border focus:border-primary"
      />

      <Button
        onClick={handleAnalyze}
        disabled={!symptoms.trim() || isAnalyzing}
        className="w-full"
        variant="hero"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Analyze Symptoms
          </>
        )}
      </Button>

      {hasAnalyzed && (
        <div className="space-y-3 pt-4 border-t animate-slide-up">
          {results.length === 0 ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-success" />
              <span>No specific conditions matched. Consider consulting a doctor if symptoms persist.</span>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Possible conditions based on your symptoms:
              </p>
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle
                        className={`h-4 w-4 ${
                          result.disease.severity === "serious"
                            ? "text-destructive"
                            : "text-warning"
                        }`}
                      />
                      <span className="font-semibold">{result.disease.name}</span>
                    </div>
                    <Badge
                      variant={
                        result.disease.severity === "serious"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {result.confidence}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.disease.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {result.matchedSymptoms.map((symptom, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

              {/* Save to History Button */}
              {user && !hasSaved && (
                <Button
                  onClick={handleSaveToHistory}
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save to History
                </Button>
              )}

              {hasSaved && (
                <p className="text-sm text-success text-center">
                  ✓ Saved to your history
                </p>
              )}

              <p className="text-xs text-muted-foreground italic">
                ⚠️ This is not medical advice. Please consult a healthcare professional.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
