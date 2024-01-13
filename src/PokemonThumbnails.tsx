import React from "react";
import { PokemonType } from "./types";
type pokeThumType = Omit<PokemonType, "jpName" | "jpType">;

export const PokemonThumbnails = ({
  id,
  name,
  image,
  iconImage,
  pokeType,
}: pokeThumType) => {
  return (
    <div className="thumb-container grass">
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <img src={iconImage} alt={name} className="icon-image" />
      <div className="detail-wrapper">
        <h4>{name}</h4>
        <h3>{pokeType}</h3>
      </div>
    </div>
  );
};
