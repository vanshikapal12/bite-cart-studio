import { Plus } from "lucide-react";
import type { FoodItem } from "@/data/foodItems";

interface FoodCardProps {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
}

const FoodCard = ({ item, onAdd }: FoodCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="flex items-end justify-between gap-2 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{item.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {item.category}
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(item)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110 active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
