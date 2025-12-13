export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food-nutrition' | 'medicines' | 'lab-tests' | 'consultation' | 'groceries';
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  // Food & Nutrition
  {
    id: 'fn-1',
    name: 'Organic Multivitamin',
    description: 'Complete daily nutrition with essential vitamins and minerals',
    price: 899,
    category: 'food-nutrition',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fn-2',
    name: 'Protein Powder - Vanilla',
    description: 'High-quality whey protein for muscle recovery',
    price: 1499,
    category: 'food-nutrition',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fn-3',
    name: 'Omega-3 Fish Oil',
    description: 'Premium fish oil capsules for heart health',
    price: 649,
    category: 'food-nutrition',
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fn-4',
    name: 'Vitamin D3 Drops',
    description: 'Essential vitamin D for bone health and immunity',
    price: 399,
    category: 'food-nutrition',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    inStock: false,
  },

  // Medicines
  {
    id: 'med-1',
    name: 'Pain Relief Tablets',
    description: 'Fast-acting pain relief for headaches and body aches',
    price: 149,
    category: 'medicines',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'med-2',
    name: 'Allergy Relief',
    description: 'Non-drowsy antihistamine for seasonal allergies',
    price: 249,
    category: 'medicines',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'med-3',
    name: 'Cold & Flu Medicine',
    description: 'Complete relief from cold and flu symptoms',
    price: 299,
    category: 'medicines',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'med-4',
    name: 'First Aid Kit',
    description: 'Complete first aid kit for home emergencies',
    price: 999,
    category: 'medicines',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Lab Tests
  {
    id: 'lab-1',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood analysis for overall health',
    price: 599,
    category: 'lab-tests',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755182?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'lab-2',
    name: 'Thyroid Panel',
    description: 'Complete thyroid function test',
    price: 1299,
    category: 'lab-tests',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'lab-3',
    name: 'Lipid Profile',
    description: 'Cholesterol and triglyceride levels',
    price: 799,
    category: 'lab-tests',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'lab-4',
    name: 'Diabetes Panel (HbA1c)',
    description: 'Blood sugar monitoring and diabetes screening',
    price: 899,
    category: 'lab-tests',
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Consultation
  {
    id: 'cons-1',
    name: 'General Physician Consult',
    description: '30-minute video consultation with a general physician',
    price: 499,
    category: 'consultation',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'cons-2',
    name: 'Dermatologist Consult',
    description: 'Expert skin care consultation online',
    price: 799,
    category: 'consultation',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'cons-3',
    name: 'Nutritionist Session',
    description: 'Personalized diet and nutrition planning',
    price: 699,
    category: 'consultation',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'cons-4',
    name: 'Mental Health Counseling',
    description: 'Confidential therapy session with licensed counselor',
    price: 999,
    category: 'consultation',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Groceries
  {
    id: 'groc-1',
    name: 'Organic Honey',
    description: 'Pure organic honey, 500g jar',
    price: 449,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groc-2',
    name: 'Mixed Nuts Pack',
    description: 'Premium mixed nuts, 400g pack',
    price: 599,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groc-3',
    name: 'Green Tea Collection',
    description: 'Assorted green tea flavors, 50 bags',
    price: 349,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groc-4',
    name: 'Organic Oatmeal',
    description: 'Whole grain organic oats, 1kg',
    price: 299,
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=400&fit=crop',
    inStock: false,
  },
];

export const categories = [
  { id: 'food-nutrition', name: 'Food & Nutrition', icon: 'Apple' },
  { id: 'medicines', name: 'Medicines', icon: 'Pill' },
  { id: 'lab-tests', name: 'Lab Tests', icon: 'TestTube2' },
  { id: 'consultation', name: 'Consultation', icon: 'Stethoscope' },
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingBasket' },
] as const;
