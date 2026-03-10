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
}

export const foodItems: FoodItem[] = [
  { id: "1", name: "Margherita Pizza", price: 12.99, category: "Pizza", image: pizzaMargherita },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, category: "Pizza", image: pizzaPepperoni },
  { id: "3", name: "Classic Cheeseburger", price: 9.99, category: "Burger", image: cheeseburger },
  { id: "4", name: "BBQ Bacon Burger", price: 13.49, category: "Burger", image: bbqBurger },
  { id: "5", name: "Fresh Lemonade", price: 4.99, category: "Drinks", image: lemonade },
  { id: "6", name: "Iced Coffee", price: 5.49, category: "Drinks", image: icedCoffee },
  { id: "7", name: "Chocolate Lava Cake", price: 7.99, category: "Dessert", image: chocolateCake },
  { id: "8", name: "Tiramisu", price: 8.49, category: "Dessert", image: tiramisu },
];

export const categories: Category[] = ["Pizza", "Burger", "Drinks", "Dessert"];
