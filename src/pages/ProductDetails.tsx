import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import CartSidebar from "@/components/CartSidebar";
import { foodItems } from "@/data/foodItems";
import { useCart } from "@/hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const item = foodItems.find((f) => f.id === id);
  const related = item
    ? foodItems.filter((f) => f.category === item.category && f.id !== item.id)
    : [];

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
            ← Back to menu
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) cart.addItem(item);
    setQty(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        {/* Product */}
        <div className="mt-4 grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              style={{ minHeight: 320 }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              {item.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{item.name}</h1>
            <p className="mt-2 text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{item.fullDescription}</p>

            {/* Quantity + Add */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl border bg-card px-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart — ${(item.price * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold md:text-3xl">You Might Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <FoodCard key={r.id} item={r} onAdd={cart.addItem} />
              ))}
            </div>
          </section>
        )}
      </main>

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

export default ProductDetails;
