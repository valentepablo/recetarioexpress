import { Key } from "react";
import { Recipe } from "./Recipe";

async function getData() {
  const res = await fetch(
    "https://recetarioexpress-api.onrender.com/api/recipes",
    { cache: "no-store" }
  );

  return res.json();
}

interface Recipe {
  _id: Key;
  name: String;
  veggie: Boolean;
  ingredients: String[];
  instructions: String[];
  image: String;
  cookingTime: Number;
  createdBy: {
    username: String;
  };
}

const RecipeContainer = async () => {
  const { recipes } = await getData();
  return (
    <div className="mb-4 space-y-4">
      {recipes.length === 0 ? (
        <span className="font-semibold">No se encontró ninguna receta!</span>
      ) : (
        recipes.map((recipe: Recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default RecipeContainer;
