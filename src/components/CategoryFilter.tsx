import { categories, type Category } from "@/data/foodItems";

interface CategoryFilterProps {
  active: Category | null;
  onSelect: (cat: Category | null) => void;
}

const CategoryFilter = ({ active, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-foreground hover:bg-muted"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === cat
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-foreground hover:bg-muted"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
