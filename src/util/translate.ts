import pokemonJson from "../data/pokemon.json";
import pokemonTypeJson from "../data/pokemonType.json";
import { PokemonTypeDictionary } from "../types/index";
const typesFile: PokemonTypeDictionary = pokemonTypeJson;

export const translateToJapanese = async (
  name: string,
  type: string
): Promise<{ pokeName: string; pokeType: string }> => {
  const pokemon = pokemonJson.find(
    (pokemon) => pokemon.en.toLowerCase() === name
  );
  if (!pokemon) {
    throw new Error(`Pokemon with name ${name} not found.`);
  }
  const jpName = pokemon.ja;
  const jpPokeType = typesFile[type];

  if (!jpPokeType) {
    throw new Error(`Pokemon type ${type} not found.`);
  }

  return { pokeName: jpName, pokeType: jpPokeType };
};
