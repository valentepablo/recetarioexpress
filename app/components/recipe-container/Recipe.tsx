import { FiClock } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { Key } from "react";
import Link from "next/link";

interface Props {
  recipe: {
    _id: Key;
    name: string;
    veggie: boolean;
    ingredients: string[];
    instructions: string[];
    image: string;
    cookingTime: number;
    createdBy: {
      username: string;
    };
  };
}

export const Recipe = ({ recipe }: Props) => {
  return (
    <article
      // href={`/recetas/${recipe.name.split(" ").join("-").toLowerCase()}`}
      className="relative h-48 overflow-hidden rounded-lg shadow-lg shadow-zinc-500"
    >
      <img
        alt={recipe.name}
        src={recipe.image}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex h-full flex-col justify-end text-white">
        <div className="bg-gradient-to-t from-zinc-900 to-transparent p-4 pt-8">
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
  );
};
