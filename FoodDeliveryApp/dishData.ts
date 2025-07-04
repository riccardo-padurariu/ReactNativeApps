export type Dish = {
  name: string;
  price: number;
  location: string;
  type: string;
  id: string;
  description: string;
  ingredients: string[];
  rating: number;
};

const restaurants = [
  "Casa Dacilor",
  "La Bunica",
  "Pizzeria Queen",
  "Toscana",
  "Popasul Nordului",
  "Casa Veche",
  "Taverna Dorohoi",
  "Urban Street Food",
  "Restaurant Parc",
  "Gustosul"
];

const sampleDishes: { name: string; type: string }[] = [
  { name: "Pizza Margherita", type: "pizza" },
  { name: "Pizza Diavola", type: "pizza" },
  { name: "Spaghetti Carbonara", type: "pasta" },
  { name: "Lasagna Bolognese", type: "pasta" },
  { name: "Burger de vită", type: "burger" },
  { name: "Cheeseburger", type: "burger" },
  { name: "Ciorbă de burtă", type: "romanian" },
  { name: "Sarmale cu mămăligă", type: "romanian" },
  { name: "Sushi California Roll", type: "sushi" },
  { name: "Sushi Sake Maki", type: "sushi" },
  { name: "Tacos cu vită", type: "mexican" },
  { name: "Quesadilla cu pui", type: "mexican" },
  { name: "Pad Thai", type: "asian" },
  { name: "Ramen cu porc", type: "asian" },
  { name: "Shaorma la farfurie", type: "fast food" },
  { name: "Kebab mixt", type: "fast food" },
  { name: "Pui crispy", type: "grill" },
  { name: "Coaste BBQ", type: "grill" },
  { name: "Clătite cu Nutella", type: "dessert" },
  { name: "Papanași", type: "dessert" },
  { name: "Salată Caesar", type: "salad" },
  { name: "Salată grecească", type: "salad" },
  { name: "Minestrone", type: "soup" },
  { name: "Supă cremă de dovleac", type: "soup" },
  { name: "Gulaș unguresc", type: "stew" },
  { name: "Chili con carne", type: "stew" },
  { name: "Pui Tikka Masala", type: "indian" },
  { name: "Naan cu usturoi", type: "indian" },
  { name: "Tagliatelle cu somon", type: "pasta" },
  { name: "Pizza Quattro Stagioni", type: "pizza" },
  { name: "Ficăței de pui", type: "romanian" },
  { name: "Tochitură moldovenească", type: "romanian" },
  { name: "Micii casei", type: "grill" },
  { name: "Pastramă de oaie", type: "romanian" },
  { name: "Tiramisu", type: "dessert" },
  { name: "Churros", type: "dessert" },
  { name: "Creveți tempura", type: "seafood" },
  { name: "Somon teriyaki", type: "seafood" },
  { name: "Burrito cu pui", type: "mexican" },
  { name: "Falafel în lipie", type: "fast food" },
  { name: "Shakshuka", type: "middle eastern" },
  { name: "Bruschette cu roșii", type: "starter" },
  { name: "Mozzarella sticks", type: "starter" },
  { name: "Pui cu smântână și ciuperci", type: "romanian" },
  { name: "Penne Arrabbiata", type: "pasta" },
  { name: "Pizza Prosciutto Funghi", type: "pizza" },
  { name: "Donut glazurat", type: "dessert" },
  { name: "Onigiri", type: "sushi" },
  { name: "Ceviche", type: "seafood" },
];

function getRandomPrice() {
  return Number((Math.random() * 40 + 10).toFixed(2));
}

const dishes: Dish[] = [];
let index = 0;

const ingredientPool = [
  'sare', 'piper', 'ulei de măsline', 'usturoi', 'roșii',
  'ceapă', 'brânză', 'carne de vită', 'pui', 'ciuperci',
  'smântână', 'măsline', 'busuioc', 'oregano', 'sos de roșii',
  'ardei', 'porumb', 'bacon', 'ou', 'făină', 'lapte',
  'pește', 'oțet balsamic', 'varză', 'mămăligă'
];

function getRandomIngredients(): string[] {
  const count = Math.floor(Math.random() * 5) + 3;
  const shuffled = [...ingredientPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateDescription(name: string, type: string): string {
  return `Deliciosul preparat ${name}, un ${type} apreciat, pregătit cu grijă și servit proaspăt.`;
}

function getRandomRating(): number {
  return Number((Math.random() * 4 + 1).toFixed(1)); 
}

while (dishes.length < 100) {
  for (const restaurant of restaurants) {
    if (dishes.length >= 100) break;

    const dish = sampleDishes[Math.floor(Math.random() * sampleDishes.length)];
    const id = `${restaurant.replace(/\s+/g, '')}_${index}`;

    dishes.push({
      name: dish.name,
      price: getRandomPrice(),
      location: restaurant,
      type: dish.type,
      description: generateDescription(dish.name,dish.type),
      ingredients: getRandomIngredients(),
      rating: getRandomRating(),
      id
    });

    index++;
  }
}

export const dishesList: Dish[] = dishes;