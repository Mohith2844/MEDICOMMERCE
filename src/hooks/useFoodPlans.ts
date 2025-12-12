import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Meal {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

export interface FoodPlan {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  meals: Meal[];
  week_start: string;
  created_at: string;
  updated_at: string;
}

export const useFoodPlans = () => {
  const [foodPlans, setFoodPlans] = useState<FoodPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFoodPlans = async () => {
    if (!user) {
      setFoodPlans([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('food_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedPlans = (data || []).map(plan => ({
        ...plan,
        meals: plan.meals as unknown as Meal[],
      }));

      setFoodPlans(transformedPlans);
    } catch (error) {
      console.error('Error fetching food plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const createFoodPlan = async (
    name: string,
    description: string,
    meals: Meal[],
    weekStart: string
  ) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to create a food plan",
        variant: "destructive",
      });
      return null;
    }

    try {
      const planData = {
        user_id: user.id,
        name,
        description,
        meals: JSON.parse(JSON.stringify(meals)),
        week_start: weekStart,
      };

      const { data, error } = await supabase
        .from('food_plans')
        .insert(planData)
        .select()
        .single();

      if (error) throw error;

      const newPlan = {
        ...data,
        meals: data.meals as unknown as Meal[],
      };

      setFoodPlans((prev) => [newPlan, ...prev]);

      toast({
        title: "Food Plan Created!",
        description: "Your weekly food plan has been saved.",
      });

      return newPlan;
    } catch (error) {
      console.error('Error creating food plan:', error);
      toast({
        title: "Error",
        description: "Failed to create food plan. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateFoodPlan = async (
    id: string,
    updates: Partial<Pick<FoodPlan, 'name' | 'description' | 'meals' | 'week_start'>>
  ) => {
    if (!user) return null;

    try {
      const updateData: Record<string, unknown> = {};
      if (updates.name !== undefined) updateData.name = updates.name;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.week_start !== undefined) updateData.week_start = updates.week_start;
      if (updates.meals !== undefined) updateData.meals = JSON.parse(JSON.stringify(updates.meals));

      const { data, error } = await supabase
        .from('food_plans')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedPlan = {
        ...data,
        meals: data.meals as unknown as Meal[],
      };

      setFoodPlans((prev) =>
        prev.map((plan) => (plan.id === id ? updatedPlan : plan))
      );

      toast({
        title: "Food Plan Updated!",
        description: "Your changes have been saved.",
      });

      return updatedPlan;
    } catch (error) {
      console.error('Error updating food plan:', error);
      toast({
        title: "Error",
        description: "Failed to update food plan. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteFoodPlan = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('food_plans')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setFoodPlans((prev) => prev.filter((plan) => plan.id !== id));

      toast({
        title: "Food Plan Deleted",
        description: "The food plan has been removed.",
      });

      return true;
    } catch (error) {
      console.error('Error deleting food plan:', error);
      toast({
        title: "Error",
        description: "Failed to delete food plan. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchFoodPlans();
  }, [user]);

  return {
    foodPlans,
    loading,
    createFoodPlan,
    updateFoodPlan,
    deleteFoodPlan,
    refetch: fetchFoodPlans,
  };
};
