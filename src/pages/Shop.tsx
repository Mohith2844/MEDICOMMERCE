import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { products, categories } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : 'All Products';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/30 py-12">
          <div className="container">
            <h1 className="text-4xl font-heading font-bold text-foreground md:text-5xl">
              Health <span className="text-gradient">Shop</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Your one-stop destination for health products, medicines, lab tests, and consultations.
            </p>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="border-b border-border bg-card/50 py-6">
          <div className="container space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                {categoryName}
              </h2>
              <span className="text-muted-foreground">
                {filteredProducts.length} products
              </span>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Search className="h-16 w-16 opacity-20" />
                <p className="mt-4 text-lg">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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

export default Shop;
