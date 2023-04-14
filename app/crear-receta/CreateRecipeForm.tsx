"use client";

import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { BiListPlus } from "react-icons/bi";

interface initialProps {
  name: string;
  veggie: boolean;
  ingredients: string[];
  instructions: string[];
  image?: string;
  cookingTime: number;
  createdBy: string;
}

const CreateRecipeForm = () => {
  const [receta, setReceta] = useState<initialProps>({
    name: "",
    veggie: false,
    ingredients: [],
    instructions: [],
    image: "https://i.blogs.es/87930e/comidas-ricas/1366_2000.jpg",
    cookingTime: 0,
    createdBy: "",
  });

  const [cookie, _] = useCookies(["access_token"]);
  const router = useRouter();

  const ingredientRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://recetarioexpress-api.onrender.com/api/recipes",
        receta,
        {
          headers: { authorization: cookie.access_token },
        }
      );
      console.log(res);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setReceta({
        ...receta,
        [e.target.name]: e.target.checked,
      });
    } else {
      setReceta({
        ...receta,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addIngredient = () => {
    const newIngredients = receta.ingredients;
    if (ingredientRef.current !== null) {
      newIngredients.push(ingredientRef.current.value);
    }
    setReceta({
      ...receta,
      ingredients: [...newIngredients],
    });
    ingredientRef.current!.value = "";
  };

  const removeIngredient = (e: any) => {
    const ingredient = e.target.textContent;
    console.log(ingredient);
    let newIngredients = receta.ingredients;
    if (receta.ingredients.includes(ingredient)) {
      newIngredients = newIngredients.filter((el) => el !== ingredient);
    }
    setReceta({
      ...receta,
      ingredients: newIngredients,
    });
  };

  const addInstruction = () => {
    const newInstructions = receta.instructions;
    if (instructionRef.current !== null) {
      newInstructions.push(instructionRef.current.value);
    }
    setReceta({
      ...receta,
      instructions: [...newInstructions],
    });
    instructionRef.current!.value = "";
  };

  const removeInstruction = (e: any) => {
    const instruction = e.target.textContent;
    let newInstructions = receta.instructions;
    if (receta.instructions.includes(instruction)) {
      newInstructions = newInstructions.filter((el) => el !== instruction);
    }
    setReceta({
      ...receta,
      instructions: newInstructions,
    });
  };

  let user: any = useGetUserID();

  useEffect(() => {
    setReceta({
      ...receta,
      createdBy: user!,
    });
  }, []);

  return (
    <form className="divide-y-[1px]" onSubmit={onSubmit}>
      <div className="pt-2 pb-6">
        <label htmlFor="name" className="mb-1 text-sm text-zinc-800">
          Titulo
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
        />
      </div>
      <div className="py-6 ">
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="ingredients" className="text-sm">
            Ingredientes
          </label>
        </div>
        <div className="flex items-center gap-4">
          <input
            ref={ingredientRef}
            type="text"
            name="ingredients"
            className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
          />
          <button
            onClick={addIngredient}
            type="button"
            className="flex items-center gap-1 text-sm text-zinc-700"
          >
            <BiListPlus className="h-4 w-4" />
            <span>Agregar</span>
          </button>
        </div>
        {receta.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {receta.ingredients.map((ingredient, i) => (
              <p
                onClick={(e) => removeIngredient(e)}
                className="relative rounded bg-zinc-200 p-1.5 text-xs capitalize text-zinc-700"
                key={i}
              >
                <span>{ingredient}</span>
                <span className="pointer-events-none absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-300 text-white">
                  &times;
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="py-6 ">
        <label htmlFor="instructions" className="mb-1 text-sm text-zinc-800">
          Instrucciones
        </label>
        <div className="flex items-center gap-4">
          <input
            ref={instructionRef}
            type="text"
            name="instructions"
            className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
          />
          <button
            onClick={addInstruction}
            type="button"
            className="flex items-center gap-1 text-sm text-zinc-700"
          >
            <BiListPlus className="h-4 w-4" />
            <span>Agregar</span>
          </button>
        </div>
        {receta.instructions.length > 0 && (
          <ul className="mt-4 list-inside list-decimal space-y-1 divide-y p-2">
            {receta.instructions.map((instruction, i) => (
              <li
                className="relative flex items-center justify-between py-1 text-sm"
                key={i}
              >
                <span className="w-full " onClick={removeInstruction}>
                  {instruction}
                </span>
                <span className="pointer-events-none absolute top-0 right-0 flex h-3 w-3 translate-y-1/2 items-center justify-center rounded-full bg-red-300 text-white">
                  &times;
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="py-6">
        <label htmlFor="image" className="mb-1 text-sm text-zinc-800">
          Imagen <strong>(no funciona)</strong>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          className="w-full rounded-lg py-2 text-sm text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
        />
      </div>
      <div className="flex gap-4 py-6">
        <div className="flex items-center gap-2">
          <label htmlFor="cookingTime" className="mb-1 text-sm text-zinc-800">
            Tiempo de cocción
          </label>
          <input
            onChange={handleChange}
            type="number"
            name="cookingTime"
            className="w-12 rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-center text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="veggie" className="mb-1 text-sm text-zinc-800">
            Vegetariano
          </label>
          <input
            onChange={handleChange}
            type="checkbox"
            name="veggie"
            className="h-5 w-5"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-rose-500 p-3 text-sm font-bold text-slate-100 transition hover:bg-rose-400"
      >
        Crear receta
      </button>
    </form>
  );
};

export default CreateRecipeForm;
