import pizzaPepperoni from "../assets/img/pizzapepperoni.jpg";
import fourCheesePizza from "../assets/img/fourcheesepizza.jpg";
import fourSeasonsPizza from "../assets/img/fourseasonspizza.jpg";
import hawaiianPizza from "../assets/img/hawaiianpizza.jpg";
import hamburger from "../assets/img/hamburger.png";
import cheeseHamburger from "../assets/img/cheesehamburger.jpg";
import chickenHamburger from "../assets/img/chickenhamburger.jpg";
import vegetarianHamburger from "../assets/img/vegetarianhamburger.jpg";
import friedChicken from "../assets/img/friedchicken.jpg";
import chickenWings from "../assets/img/chickenwings.jpg";
import chickenNuggets from "../assets/img/chickennuggets.jpg";
import spicyFriedChicken from "../assets/img/spicyfriedchicken.jpg";

export const products = [
  {
    id: "pizza-01",
    title: "Pizza pepperoni",
    image: pizzaPepperoni,
    category: { name: "Pizza", id: "pizza" },
    price: 20,
  },
  {
    id: "pizza-02",
    title: "Four cheese pizza",
    image: fourCheesePizza,
    category: { name: "Pizza", id: "pizza" },
    price: 40,
  },
  {
    id: "pizza-03",
    title: "Four seasons pizza",
    image: fourSeasonsPizza,
    category: { name: "Pizza", id: "pizza" },
    price: 60,
  },
  {
    id: "pizza-04",
    title: "Hawaiian pizza",
    image: hawaiianPizza,
    category: { name: "Pizza", id: "pizza" },
    price: 40,
  },
  {
    id: "hamburger-01",
    title: "Clasic hamburger",
    image: hamburger,
    category: { name: "Hamburger", id: "hamburger" },
    price: 10,
  },
  {
    id: "hamburger-02",
    title: "Cheese hamburger",
    image: cheeseHamburger,
    category: { name: "Hamburger", id: "hamburger" },
    price: 15,
  },
  {
    id: "hamburger-03",
    title: "Chicken hamburger",
    image: chickenHamburger,
    category: { name: "Hamburger", id: "hamburger" },
    price: 10,
  },
  {
    id: "hamburger-04",
    title: "Vegetarian hamburger",
    image: vegetarianHamburger,
    category: { name: "Hamburger", id: "hamburger" },
    price: 15,
  },
  {
    id: "chicken-01",
    title: "Fried chicken",
    image: friedChicken,
    category: { name: "Chicken", id: "chicken" },
    price: 15,
  },
  {
    id: "chicken-02",
    title: "Chicken wings",
    image: chickenWings,
    category: { name: "Chicken", id: "chicken" },
    price: 20,
  },
  {
    id: "chicken-03",
    title: "Chicken nuggets",
    image: chickenNuggets,
    category: { name: "Chicken", id: "chicken" },
    price: 10,
  },
  {
    id: "chicken-04",
    title: "Spicy fried chicken",
    image: spicyFriedChicken,
    category: { name: "Chicken", id: "chicken" },
    price: 20,
  },
];
