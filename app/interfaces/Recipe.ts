import { Key } from "react";

export interface RecipeInterface {
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
}
