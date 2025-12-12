import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Clock, Trash2, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SymptomHistoryItem {
  id: string;
  symptoms: string[];
  results: {
    disease: { name: string };
    confidence: number;
  }[];
  created_at: string;
}

export default function Profile() {
  const { user, profile, loading, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [symptomHistory, setSymptomHistory] = useState<SymptomHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchSymptomHistory();
    }
  }, [user]);

  const fetchSymptomHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("symptom_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error && data) {
      const mapped = data.map((item) => ({
        ...item,
        results: (item.results as unknown as SymptomHistoryItem["results"]) || [],
      }));
      setSymptomHistory(mapped);
    }
    setLoadingHistory(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const { error } = await updateProfile({
      first_name: firstName,
      last_name: lastName,
    });

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }

    setUpdating(false);
  };

  const handleDeleteHistory = async (id: string) => {
    const { error } = await supabase
      .from("symptom_history")
      .delete()
      .eq("id", id);

    if (!error) {
      setSymptomHistory((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "Deleted",
        description: "Symptom check removed from history.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-background via-secondary/30 to-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-heading font-bold mb-8">Your Profile</h1>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Profile Info Card */}
            <div className="bg-card rounded-2xl shadow-soft border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {profile?.first_name || profile?.last_name
                      ? `${profile?.first_name || ""} ${profile?.last_name || ""}`
                      : "Welcome!"}
                  </h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={updating}
                >
                  {updating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Member since{" "}
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Symptom History Card */}
            <div className="bg-card rounded-2xl shadow-soft border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Symptom History
              </h2>

              {loadingHistory ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : symptomHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No symptom checks yet. Try our symptom checker!
                </p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {symptomHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-secondary/50 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.created_at).toLocaleString()}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.symptoms.slice(0, 3).map((symptom, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                            {item.symptoms.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.symptoms.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteHistory(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.results.length > 0 && (
                        <p className="text-sm">
                          Top match:{" "}
                          <span className="font-medium">
                            {item.results[0].disease.name}
                          </span>{" "}
                          ({item.results[0].confidence}%)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
