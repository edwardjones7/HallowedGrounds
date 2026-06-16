export type MenuItem = {
  name: string;
  description?: string;
  price?: string;
  tags?: string[]; // e.g. "Signature", "Seasonal", "Seed-oil free"
};

export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

// ⚠ CLIENT TO CONFIRM: exact items + prices — to be extracted from current PDF menus.
// Prices below are representative placeholders for layout; mark before launch.
export const drinkMenu: MenuCategory[] = [
  {
    id: "signature",
    title: "Signature Lattes",
    note: "Made with house-made purees. Hot or iced.",
    items: [
      {
        name: "Blueberry Cheesecake",
        description: "Espresso, blueberry puree, cheesecake cream, graham finish.",
        price: "6.75",
        tags: ["Signature"],
      },
      {
        name: "PBJ Latte",
        description: "Peanut butter, house berry jam, espresso, steamed milk.",
        price: "6.50",
        tags: ["Signature"],
      },
      {
        name: "Pumpkin Pie Latte",
        description: "Real pumpkin, warm spice, espresso, whipped cream.",
        price: "6.50",
        tags: ["Seasonal"],
      },
    ],
  },
  {
    id: "espresso",
    title: "Espresso",
    items: [
      { name: "Espresso / Doppio", price: "3.25" },
      { name: "Macchiato", price: "3.75" },
      { name: "Cortado", price: "4.25" },
      { name: "Cappuccino", price: "4.75" },
      { name: "Latte", description: "Hot or iced", price: "5.25" },
      { name: "Mocha", price: "5.75" },
    ],
  },
  {
    id: "coldbrew",
    title: "Cold Brew & Nitro",
    items: [
      { name: "Cold Brew", price: "4.75" },
      { name: "Nitro Cold Brew", description: "On tap", price: "5.50" },
      { name: "Frozen Coffee", price: "6.25" },
    ],
  },
  {
    id: "tea",
    title: "Tea & Not-Coffee",
    items: [
      { name: "Loose Leaf Tea", price: "3.75" },
      { name: "London Fog", price: "5.25" },
      { name: "Matcha Latte", price: "5.75" },
      { name: "House Hot Chocolate", price: "4.75" },
      { name: "Coffee Mocktails & Seltzers", description: "Ask about today's pour" },
    ],
  },
];

export const foodMenu: MenuCategory[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    note: "Served on house-made bread. Seed-oil free, tallow-fried.",
    items: [
      {
        name: "Breakfast Sandwich",
        description: "Egg, cheese, your choice of meat on a house roll.",
        price: "8.50",
        tags: ["Guest Favorite"],
      },
      {
        name: "Sausage Smash Potatoes",
        description: "Crispy tallow-fried potatoes, house sausage, herbs.",
        price: "9.00",
      },
      {
        name: "Pork Roll, Egg & Cheese",
        description: "A Jersey classic, done the clean way.",
        price: "8.75",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    items: [
      {
        name: "Seasonal Sandwich",
        description: "Rotating, built on scratch-baked bread.",
        price: "12.00",
      },
      {
        name: "House Soup & Salad",
        description: "Local greens, house dressings.",
        price: "10.50",
      },
    ],
  },
  {
    id: "goodies",
    title: "Bakery & Grab-and-Go",
    items: [
      { name: "Daily Pastries", description: "Baked in-house each morning" },
      { name: "Cinnamon-Glazed Nuts", description: "Fresh-roasted" },
      { name: "House-Ground Nut Butters" },
    ],
  },
];

// Rotating monthly barista creations (named by the team).
export const monthlySpecials: MenuItem[] = [
  {
    name: "Honey Lavender Cortado",
    description: "Local honey, lavender, double shot. This month's pour.",
    tags: ["Barista Special"],
  },
  {
    name: "Maple Tahini Latte",
    description: "Toasted tahini, grade-A maple, espresso.",
    tags: ["Barista Special"],
  },
];
