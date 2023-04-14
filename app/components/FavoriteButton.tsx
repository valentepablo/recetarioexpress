"use client";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSetFavorite = () => {
    setIsFavorite((isFavorite) => !isFavorite);
  };

  return (
    <button onClick={handleSetFavorite}>
      {isFavorite ? (
        <AiFillHeart className="h-5 w-5" />
      ) : (
        <AiOutlineHeart className="h-5 w-5" />
      )}
    </button>
  );
};

export default FavoriteButton;
