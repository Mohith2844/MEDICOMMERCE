import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useFoodPlans, Meal } from '@/hooks/useFoodPlans';
import { Plus, Calendar, Trash2, Edit2, Utensils, ArrowLeft } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';

const defaultMeals: Meal[] = [
  { day: 'Monday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Tuesday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Wednesday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Thursday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Friday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Saturday', breakfast: '', lunch: '', dinner: '', snacks: '' },
  { day: 'Sunday', breakfast: '', lunch: '', dinner: '', snacks: '' },
];

const FoodPlans = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { foodPlans, loading, createFoodPlan, deleteFoodPlan } = useFoodPlans();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weekStart: format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
    meals: defaultMeals,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleMealChange = (dayIndex: number, mealType: keyof Meal, value: string) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[dayIndex] = { ...updatedMeals[dayIndex], [mealType]: value };
    setFormData({ ...formData, meals: updatedMeals });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    await createFoodPlan(
      formData.name,
      formData.description,
      formData.meals,
      formData.weekStart
    );

    setFormData({
      name: '',
      description: '',
      weekStart: format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'),
      meals: defaultMeals,
    });
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteFoodPlan(id);
    if (selectedPlan === id) setSelectedPlan(null);
  };

  const activePlan = foodPlans.find((p) => p.id === selectedPlan);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container py-8">
          <div className="space-y-4">
            {[1, 2].map((i) => (
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
        <section className="bg-gradient-to-br from-success/10 via-background to-accent/30 py-12">
          <div className="container">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground">
                  Weekly <span className="text-gradient">Food Plans</span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Plan your meals for the week and stay healthy
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Weekly Food Plan</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Plan Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Healthy Week"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weekStart">Week Starting</Label>
                        <Input
                          id="weekStart"
                          type="date"
                          value={formData.weekStart}
                          onChange={(e) =>
                            setFormData({ ...formData, weekStart: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your meal plan goals..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Daily Meals</h3>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-24">Day</TableHead>
                              <TableHead>Breakfast</TableHead>
                              <TableHead>Lunch</TableHead>
                              <TableHead>Dinner</TableHead>
                              <TableHead>Snacks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {formData.meals.map((meal, index) => (
                              <TableRow key={meal.day}>
                                <TableCell className="font-medium">
                                  {meal.day}
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Breakfast..."
                                    value={meal.breakfast}
                                    onChange={(e) =>
                                      handleMealChange(index, 'breakfast', e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Lunch..."
                                    value={meal.lunch}
                                    onChange={(e) =>
                                      handleMealChange(index, 'lunch', e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Dinner..."
                                    value={meal.dinner}
                                    onChange={(e) =>
                                      handleMealChange(index, 'dinner', e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Snacks..."
                                    value={meal.snacks}
                                    onChange={(e) =>
                                      handleMealChange(index, 'snacks', e.target.value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <Button onClick={handleSubmit} className="w-full">
                      Create Food Plan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container">
            {foodPlans.length === 0 ? (
              <Card className="py-16">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <Utensils className="h-16 w-16 text-muted-foreground/30" />
                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    No food plans yet
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Create your first weekly meal plan to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Plans List */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Your Plans</h2>
                  {foodPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'ring-2 ring-primary'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{plan.name}</CardTitle>
                            <CardDescription className="mt-1">
                              <Calendar className="inline-block mr-1 h-3 w-3" />
                              Week of{' '}
                              {format(new Date(plan.week_start), 'MMM d, yyyy')}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(plan.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      {plan.description && (
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {plan.description}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Plan Details */}
                <div className="lg:col-span-2">
                  {activePlan ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>{activePlan.name}</CardTitle>
                        <CardDescription>
                          <Calendar className="inline-block mr-1 h-3 w-3" />
                          Week of{' '}
                          {format(new Date(activePlan.week_start), 'MMMM d, yyyy')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-24">Day</TableHead>
                                <TableHead>Breakfast</TableHead>
                                <TableHead>Lunch</TableHead>
                                <TableHead>Dinner</TableHead>
                                <TableHead>Snacks</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {activePlan.meals.map((meal) => (
                                <TableRow key={meal.day}>
                                  <TableCell className="font-medium">
                                    {meal.day}
                                  </TableCell>
                                  <TableCell>
                                    {meal.breakfast || (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {meal.lunch || (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {meal.dinner || (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    {meal.snacks || (
                                      <span className="text-muted-foreground">-</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="flex h-full items-center justify-center py-16">
                      <CardContent className="text-center">
                        <Utensils className="mx-auto h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-4 text-muted-foreground">
                          Select a plan to view details
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FoodPlans;
