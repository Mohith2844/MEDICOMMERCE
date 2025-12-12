import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Apple, Pill, TestTube2, Stethoscope, ShoppingBasket } from 'lucide-react';

const iconMap = {
  Apple,
  Pill,
  TestTube2,
  Stethoscope,
  ShoppingBasket,
};

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className="transition-all"
      >
        All Products
      </Button>
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className="transition-all"
          >
            <Icon className="mr-2 h-4 w-4" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};
