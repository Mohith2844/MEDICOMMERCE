import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Order interface
      const transformedOrders = (data || []).map(order => ({
        ...order,
        items: order.items as unknown as CartItem[],
        total_amount: Number(order.total_amount),
      }));
      
      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (items: CartItem[], totalAmount: number) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to place an order",
        variant: "destructive",
      });
      return null;
    }

    try {
      const orderData = {
        user_id: user.id,
        items: JSON.parse(JSON.stringify(items)),
        total_amount: totalAmount,
        status: 'completed',
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      const newOrder = {
        ...data,
        items: data.items as unknown as CartItem[],
        total_amount: Number(data.total_amount),
      };

      setOrders((prev) => [newOrder, ...prev]);
      
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully.",
      });

      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return { orders, loading, createOrder, refetch: fetchOrders };
};
