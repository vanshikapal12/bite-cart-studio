import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { FoodItem } from "@/data/foodItems";

interface FoodCardProps {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
}

const FoodCard = ({ item, onAdd }: FoodCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${item.id}`} className="block aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${item.id}`}>
          <h3 className="truncate font-semibold leading-tight hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {item.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAdd(item);
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110 active:scale-95"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
