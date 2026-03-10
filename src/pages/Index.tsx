import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import FoodCard from "@/components/FoodCard";
import CartSidebar from "@/components/CartSidebar";
import { foodItems, type Category } from "@/data/foodItems";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  const filtered = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Delicious food,
            <br />
            <span className="text-primary">delivered fast.</span>
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Browse our curated menu and get your favorites delivered to your door in minutes.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter active={category} onSelect={setCategory} />
          <div className="w-full sm:max-w-xs">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={cart.addItem} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        )}
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onRemove={cart.removeItem}
        onUpdateQuantity={cart.updateQuantity}
      />
    </div>
  );
};

export default Index;
