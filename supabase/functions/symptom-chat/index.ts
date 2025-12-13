import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    
    if (type === "food-plan") {
      systemPrompt = `You are a certified nutritionist AI assistant. Based on the user's symptoms and health conditions, provide a detailed 7-day meal plan that supports their recovery and overall health.

Format your response as follows:
- Start with a brief overview of nutritional goals based on their condition
- For each day (Day 1 to Day 7), provide:
  - Breakfast
  - Mid-morning snack
  - Lunch
  - Afternoon snack
  - Dinner
- Include specific foods, portions, and preparation suggestions
- End with general dietary tips and foods to avoid

Keep recommendations practical, affordable, and easy to prepare. Focus on anti-inflammatory foods, nutrient-dense options, and foods that support immune function.`;
    } else {
      systemPrompt = `You are a compassionate and knowledgeable medical symptom checker AI assistant. Your role is to:

1. Listen carefully to the user's symptoms and ask clarifying questions when needed
2. Provide possible conditions that might match their symptoms (always mention this is not a diagnosis)
3. Suggest when they should seek professional medical care
4. Offer general wellness advice and home remedies where appropriate

Important guidelines:
- Always remind users that you're an AI and cannot replace professional medical advice
- For serious symptoms (chest pain, difficulty breathing, severe bleeding, etc.), immediately recommend emergency care
- Ask about symptom duration, severity, and any relevant medical history
- Be empathetic and reassuring while remaining informative
- Suggest appropriate specialists when relevant (cardiologist, dermatologist, etc.)

Never diagnose conditions definitively. Use phrases like "this could be", "you might want to consider", "common causes include".`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Symptom chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
