import { FiClock } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import Link from "next/link";
import { RecipeInterface } from "../../interfaces/Recipe";

interface Props {
  recipe: RecipeInterface;
}

//${recipe.name.split(" ").join("-").toLowerCase()}

export const Recipe = ({ recipe }: Props) => {
  return (
    <Link href={`/recetas/${recipe._id}`}>
      <article className="relative h-48 overflow-hidden rounded-lg shadow-md shadow-zinc-500">
        <img
          alt={recipe.name}
          src={recipe.image}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex h-full flex-col justify-end text-white">
          <div className="bg-gradient-to-t from-zinc-800 to-transparent p-4 pt-8">
            <p className="text-lg font-semibold">{recipe.name}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs">
                <p className="capitalize text-zinc-200">
                  {recipe.createdBy.username}
                </p>
                <span>&#183;</span>
                <p className="flex items-center gap-1 text-zinc-200">
                  <FiClock />
                  <span>{Number(recipe.cookingTime)} min</span>
                </p>
              </div>
              {recipe.veggie ? (
                <p className="flex items-center gap-1 rounded-lg border border-green-300 bg-green-300 p-1 font-semibold text-green-800">
                  <BiLeaf className="text-sm" />
                  <span className="text-xs">Vegetariano</span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
