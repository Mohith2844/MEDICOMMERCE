import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Package, ShoppingBag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { orders, loading } = useOrders();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/30 py-12">
          <div className="container">
            <Button
              variant="ghost"
              onClick={() => navigate('/shop')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Order <span className="text-gradient">History</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              View your past orders and track deliveries
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {orders.length === 0 ? (
              <Card className="py-16">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    No orders yet
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Start shopping to see your orders here
                  </p>
                  <Button onClick={() => navigate('/shop')} className="mt-6">
                    Browse Products
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">
                            Order #{order.id.slice(0, 8)}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              order.status === 'completed'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {order.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(order.created_at), 'MMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-16 w-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-foreground">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-medium text-foreground">
                              ${(item.quantity * item.product.price).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end border-t pt-4">
                        <p className="text-lg font-bold text-primary">
                          Total: ${order.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
