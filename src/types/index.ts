export type PokemonType = {
  id: number;
  name: string;
  iconImage: string;
  image: string;
  pokeType: string;
  jpName: string;
  jpType: string;
};

export interface PokemonTypeDictionary {
  [key: string]: string;
}
