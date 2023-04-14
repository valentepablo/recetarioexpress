import { BiLeaf } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { RecipeInterface } from "../interfaces/Recipe";
import BackButton from "./BackButton";
import FavoriteButton from "./FavoriteButton";

interface Props {
  recipe: RecipeInterface;
}

const RecipeView = ({ recipe }: Props) => {
  return (
    <article>
      <div className="relative h-60">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 z-10 flex h-40 items-start justify-between bg-gradient-to-b from-zinc-900 to-transparent p-4">
          <BackButton />
          <div>
            <p className="flex items-center gap-1 rounded-lg border border-green-300 bg-green-300 p-1 font-semibold text-green-800">
              <BiLeaf className="text-sm" />
              <span className="text-xs">Vegetariano</span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex -translate-y-12 items-center justify-between rounded-xl border bg-white px-4 py-3 shadow-lg">
          <div>
            <p className="text-xl font-bold">{recipe.name}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
              <p className="capitalize">{recipe.createdBy.username}</p>
              <span>&#183;</span>
              <p className="flex items-center gap-1">
                <FiClock />
                <span>{Number(recipe.cookingTime)} min</span>
              </p>
            </div>
          </div>
          <FavoriteButton />
        </div>
        <section className="-mt-6">
          <p className="text-lg font-bold">Ingredientes</p>
          <ul className="mt-1 space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-lg bg-zinc-100 p-3 text-sm capitalize text-zinc-600"
              >
                {ingredient}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-bold">Instrucciones</p>
          <ul className="list-inside list-disc space-y-2 p-2">
            {recipe.instructions.map((instruction) => (
              <li
                key={instruction}
                className="text-sm text-zinc-600 first-letter:capitalize"
              >
                {instruction}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default RecipeView;
