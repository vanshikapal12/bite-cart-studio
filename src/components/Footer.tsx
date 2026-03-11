import { UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container mx-auto px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">Foodie</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Delivering delicious food to your doorstep since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-3 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="transition-colors hover:text-primary">Home</Link></li>
            <li><Link to="/products" className="transition-colors hover:text-primary">Products</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-3 font-semibold">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Pizza</li>
            <li>Burgers</li>
            <li>Drinks</li>
            <li>Desserts</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@foodie.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Gourmet Street, Food City</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Foodie. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
