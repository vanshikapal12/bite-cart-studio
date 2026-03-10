import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Heart, Target, Users, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  { icon: Heart, title: "Passion for Food", desc: "Every dish is crafted with love and dedication to bring you an unforgettable experience." },
  { icon: Target, title: "Quality Ingredients", desc: "We source only the freshest, highest-quality ingredients from trusted local suppliers." },
  { icon: Users, title: "Community First", desc: "We believe in building strong connections with our customers and local community." },
  { icon: Award, title: "Award-Winning", desc: "Recognized for excellence in taste, service, and customer satisfaction." },
];

const About = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutTeam} alt="Our team" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 text-center md:py-32">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">About Foodie</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            We're on a mission to deliver happiness, one meal at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Our Story</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Founded in 2020, Foodie started with a simple idea: make gourmet food accessible to everyone. 
            What began as a small kitchen with big dreams has grown into a beloved brand trusted by thousands. 
            We partner with talented chefs who share our commitment to quality, freshness, and flavor. 
            Every item on our menu is carefully developed and taste-tested to ensure it meets the highest standards.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card">
        <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-2 md:py-20">
          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To revolutionize food delivery by combining restaurant-quality meals with lightning-fast service, 
              making exceptional dining experiences available to everyone, everywhere.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-8 shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To become the most loved food delivery platform — known for our unwavering quality, 
              exceptional customer care, and positive impact on local food communities.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="mb-10 text-center font-display text-3xl font-bold md:text-4xl">Why Choose Us</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <v.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-14 text-center md:grid-cols-4">
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Meals Daily"],
            ["4.9★", "Average Rating"],
            ["30 min", "Avg. Delivery"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">{stat}</p>
              <p className="mt-1 text-sm text-primary-foreground/70">{label}</p>
            </div>
          ))}
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

export default About;
