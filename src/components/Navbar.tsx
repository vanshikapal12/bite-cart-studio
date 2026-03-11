import { ShoppingCart, UtensilsCrossed, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
];

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">Foodie</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onCartClick}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
