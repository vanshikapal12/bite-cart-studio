import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import cheeseburger from "@/assets/cheeseburger.jpg";
import bbqBurger from "@/assets/bbq-burger.jpg";
import lemonade from "@/assets/lemonade.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import tiramisu from "@/assets/tiramisu.jpg";

export type Category = "Pizza" | "Burger" | "Drinks" | "Dessert";

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  fullDescription: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 12.99,
    category: "Pizza",
    image: pizzaMargherita,
    description: "Classic tomato sauce, fresh mozzarella, and basil.",
    fullDescription: "Our Margherita Pizza is a timeless classic, crafted with San Marzano tomato sauce, hand-pulled fresh mozzarella, aromatic basil leaves, and a drizzle of extra-virgin olive oil on a perfectly wood-fired thin crust. Each bite delivers the authentic taste of Naples."
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    price: 14.99,
    category: "Pizza",
    image: pizzaPepperoni,
    description: "Loaded with spicy pepperoni and melted cheese.",
    fullDescription: "Generously topped with premium spicy pepperoni that curls and crisps in the oven, layered over a bed of rich mozzarella and our signature tomato sauce. The perfect combination of heat, cheese, and crunch on our hand-tossed dough."
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    price: 9.99,
    category: "Burger",
    image: cheeseburger,
    description: "Juicy beef patty with melted cheddar and fresh veggies.",
    fullDescription: "A quarter-pound of 100% Angus beef, seasoned and grilled to perfection, topped with aged cheddar cheese, crisp lettuce, ripe tomato, pickles, and our house-made secret sauce, all nestled in a toasted brioche bun."
  },
  {
    id: "4",
    name: "BBQ Bacon Burger",
    price: 13.49,
    category: "Burger",
    image: bbqBurger,
    description: "Smoky BBQ sauce, crispy bacon, and onion rings.",
    fullDescription: "Our signature BBQ Bacon Burger features a thick Angus beef patty smothered in smoky hickory BBQ sauce, topped with crispy applewood-smoked bacon, crunchy onion rings, and melted pepper jack cheese on a toasted pretzel bun."
  },
  {
    id: "5",
    name: "Fresh Lemonade",
    price: 4.99,
    category: "Drinks",
    image: lemonade,
    description: "Hand-squeezed lemons with a hint of mint.",
    fullDescription: "Refreshingly tart and sweet, our Fresh Lemonade is made daily from hand-squeezed lemons, pure cane sugar, and a sprig of fresh mint. Served ice-cold with a lemon wheel garnish — the perfect companion to any meal."
  },
  {
    id: "6",
    name: "Iced Coffee",
    price: 5.49,
    category: "Drinks",
    image: icedCoffee,
    description: "Cold-brewed coffee served over ice.",
    fullDescription: "Smooth, bold, and never bitter — our Iced Coffee is cold-brewed for 18 hours using single-origin beans, then served over ice with your choice of milk. A refreshing pick-me-up that's full of rich, complex flavor."
  },
  {
    id: "7",
    name: "Chocolate Lava Cake",
    price: 7.99,
    category: "Dessert",
    image: chocolateCake,
    description: "Warm molten chocolate center with vanilla ice cream.",
    fullDescription: "Indulge in our decadent Chocolate Lava Cake — a rich, dark chocolate cake with a warm, gooey molten center that flows out with every spoonful. Served with a scoop of creamy vanilla bean ice cream and a dusting of cocoa powder."
  },
  {
    id: "8",
    name: "Tiramisu",
    price: 8.49,
    category: "Dessert",
    image: tiramisu,
    description: "Espresso-soaked ladyfingers with mascarpone cream.",
    fullDescription: "Our authentic Italian Tiramisu layers espresso-soaked Savoiardi ladyfingers with silky mascarpone cream, lightly sweetened and dusted with premium cocoa powder. Made fresh daily and chilled to perfection for the ultimate creamy, coffee-kissed dessert."
  },
];

export const categories: Category[] = ["Pizza", "Burger", "Drinks", "Dessert"];
