import { FiClock } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { Key } from "react";
import Link from "next/link";

interface Props {
  recipe: {
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
  };
}

export const Recipe = ({ recipe }: Props) => {
  return (
    <article
      // href={`/recetas/${recipe.name.split(" ").join("-").toLowerCase()}`}
      className="flex h-48 flex-col justify-between rounded-lg bg-gradient-to-b from-rose-400 to-rose-900 p-4 text-white"
    >
      <p className="text-xs text-zinc-200">{recipe.createdBy.username}</p>
      <div>
        <p className="text-lg font-semibold">{recipe.name}</p>
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-zinc-200">
            <FiClock className="text-sm" />
            <span className="text-xs">{Number(recipe.cookingTime)} min</span>
          </p>
          {recipe.veggie ? (
            <p className="flex items-center gap-1 rounded-lg border border-green-300 bg-green-300 p-1 font-semibold text-green-800">
              <BiLeaf className="text-sm" />
              <span className="text-xs">Vegetariano</span>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
};
