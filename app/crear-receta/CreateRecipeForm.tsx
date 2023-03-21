"use client";

import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

interface initialProps {
  name: String;
  veggie: Boolean;
  ingredients: String[];
  instructions: String[];
  image: String;
  cookingTime: Number;
  createdBy: String;
}

const CreateRecipeForm = () => {
  const [receta, setReceta] = useState<initialProps>({
    name: "",
    veggie: false,
    ingredients: [],
    instructions: [],
    image: "",
    cookingTime: 0,
    createdBy: "",
  });

  const [cookie, _] = useCookies(["access_token"]);
  const router = useRouter();

  const ref = useRef<HTMLInputElement>(null);

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
      alert("Receta creada con exito!");
      router.push("/");
      console.log(res);
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
    if (ref.current !== null) {
      newIngredients.push(ref.current.value);
    }
    setReceta({
      ...receta,
      ingredients: [...newIngredients],
    });
    ref.current!.value = "";
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

  let user: any = useGetUserID();

  useEffect(() => {
    setReceta({
      ...receta,
      createdBy: user!,
    });
  }, []);

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
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
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="ingredients" className="text-sm">
            Ingredientes
          </label>
          <button
            onClick={addIngredient}
            type="button"
            className="text-sm text-zinc-800 underline"
          >
            Agregar
          </button>
        </div>
        <input
          ref={ref}
          type="text"
          name="ingredients"
          className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
        />
        {receta.ingredients.length > 0 ? (
          <div className="flex flex-wrap gap-2 py-2">
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
        ) : null}
      </div>
      <div>
        <label htmlFor="instructions" className="mb-1 text-sm text-zinc-800">
          Instrucciones
        </label>
        <input
          type="text"
          name="instructions"
          className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
        />
      </div>
      <div>
        <label htmlFor="image" className="mb-1 text-sm text-zinc-800">
          Imagen
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="image"
          className="w-full rounded-lg bg-zinc-200 bg-opacity-50 p-2 text-zinc-500 outline-none transition placeholder:text-zinc-400 placeholder:text-opacity-60 focus:ring focus:ring-rose-300"
        />
      </div>
      <div className="flex gap-4">
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
