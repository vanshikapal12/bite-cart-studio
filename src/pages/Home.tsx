import { Link } from "react-router-dom";
import { ArrowRight, Truck, Clock, Star, ShieldCheck } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import CartSidebar from "@/components/CartSidebar";
import { foodItems } from "@/data/foodItems";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Get your food in under 30 minutes." },
  { icon: Clock, title: "Always Fresh", desc: "Prepared right when you order." },
  { icon: Star, title: "Top Rated", desc: "4.9★ from 10,000+ happy customers." },
  { icon: ShieldCheck, title: "Quality First", desc: "Only the finest ingredients used." },
];

const Home = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const featured = foodItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />
      <HeroBanner />

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Popular Picks</h2>
            <p className="mt-1 text-muted-foreground">Our customers' all-time favorites</p>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={cart.addItem} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Order?
          </h2>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            Browse our full menu and get your favorites delivered to your door in minutes.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-xl bg-card px-8 py-3.5 font-semibold text-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Browse Menu
          </Link>
        </div>
      </section>

      <Footer />
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

export default Home;
