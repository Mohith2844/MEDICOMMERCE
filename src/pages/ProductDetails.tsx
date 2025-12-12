import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, ArrowLeft, Check, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { user } = useAuth();

  const product = products.find((p) => p.id === id);
  const isInCart = items.some((item) => item.product.id === id);
  const cartItem = items.find((item) => item.product.id === id);

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  const categoryName = categories.find((c) => c.id === product?.category)?.name;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Product not found
            </h1>
            <Button onClick={() => navigate('/shop')} className="mt-4">
              Back to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container py-8">
          {/* Breadcrumb */}
          <Button
            variant="ghost"
            onClick={() => navigate('/shop')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>

          {/* Product Details */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <Badge variant="outline" className="w-fit mb-4">
                {categoryName}
              </Badge>
              <h1 className="text-3xl font-heading font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= 4 ? 'text-warning fill-warning' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.0 (128 reviews)
                </span>
              </div>

              <p className="mt-6 text-lg text-muted-foreground">
                {product.description}
              </p>

              <p className="mt-6 text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className="mt-8 w-full md:w-auto"
                variant={isInCart ? "secondary" : "default"}
              >
                {isInCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    In Cart ({cartItem?.quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>

              {/* Features */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Truck className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">On orders $50+</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Secure Payment</p>
                      <p className="text-xs text-muted-foreground">100% protected</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">30-day policy</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
                Related Products
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
