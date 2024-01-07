import pokemonJson from "../data/pokemon.json";
import pokemonTypeJson from "../data/pokemonType.json";

export const translateToJapanese = async (name, type) => {
  const jpName = await pokemonJson.find(
    (pokemon) => pokemon.en.toLowerCase() === name
  ).ja;
  const jpPokeType = await pokemonTypeJson[type];
  return { pokeName: jpName, pokeType: jpPokeType };
};
