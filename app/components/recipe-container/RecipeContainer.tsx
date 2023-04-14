import { Recipe } from "./Recipe";
import { RecipeInterface } from "../../interfaces/Recipe";

async function getData() {
  const res = await fetch(
    "https://recetarioexpress-api.onrender.com/api/recipes",
    {
      cache: "no-cache",
    }
  );

  return res.json();
}

const RecipeContainer = async () => {
  const { recipes } = await getData();
  return (
    <div className="mb-4 grid grid-cols-1 gap-3">
      {recipes.length === 0 ? (
        <span className="font-semibold">No se encontró ninguna receta!</span>
      ) : (
        recipes.map((recipe: RecipeInterface) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default RecipeContainer;
