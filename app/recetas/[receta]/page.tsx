"use client";

import React from "react";
import RecipeView from "../../components/RecipeView";
import { useParams } from "next/navigation";

async function getData(id: string) {
  const res = await fetch(
    `https://recetarioexpress-api.onrender.com/api/recipes/${id}`
  );
  return res.json();
}

const RecipePage = async () => {
  const { receta } = useParams();
  const recipe = await getData(receta);

  return <RecipeView recipe={recipe} />;
};

export default RecipePage;
