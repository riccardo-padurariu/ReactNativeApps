type Dish = {
  name: string;
  price: number;
  location: string;
  type: string;
  id: string;
};

type DetailedDish = {
  name: string;
  price: number;
  description: string;
  ingredients: string[];
  rating: number;
  type: string;
};

type Restaurant = {
  id: string;
  name: string;
  location: string;
  contact: string;
  dishes: DetailedDish[];
};

import { dishesList } from './dishData';

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

const restaurantsRaw = [
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

const restaurants: Restaurant[] = restaurantsRaw.map((restaurant) => {
  const dishPrefix = restaurant.replace(/\s+/g, '');

  const filteredDishes = dishesList
    .filter((dish) => dish.id.startsWith(dishPrefix))
    .map((dish) => ({
      name: dish.name,
      price: dish.price,
      description: generateDescription(dish.name, dish.type),
      ingredients: getRandomIngredients(),
      rating: getRandomRating(),
      type: dish.type,
      id: `${dish.name}_${dish.price}`
    }));

  return {
    id: restaurant, 
    name: restaurant,
    location: restaurant,
    contact: '0758180243',
    dishes: filteredDishes
  };
});

export const restaurantsList: Restaurant[] = restaurants;
