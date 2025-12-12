-- Create orders table for order history
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create food_plans table for weekly meal plans
CREATE TABLE public.food_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  meals JSONB NOT NULL DEFAULT '[]',
  week_start DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_plans ENABLE ROW LEVEL SECURITY;

-- Orders RLS policies
CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Food plans RLS policies
CREATE POLICY "Users can view their own food plans"
ON public.food_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food plans"
ON public.food_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food plans"
ON public.food_plans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food plans"
ON public.food_plans FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for food_plans updated_at
CREATE TRIGGER update_food_plans_updated_at
BEFORE UPDATE ON public.food_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();