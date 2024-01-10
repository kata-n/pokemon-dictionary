import React, { SetStateAction } from "react";
import { useEffect, useState } from "react";
import { PokemonThumbnails } from "./PokemonThumbnails";
import { translateToJapanese } from "./util/translate";
import { PokemonType } from "./types";

function App() {
  const [pokemonList, setAllPokemonList] = useState<PokemonType[]>();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getAllPokemonList();
  }, []);

  const createPokemonObject = (results: PokemonType[]) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _pokeType = data.types[0].type.name;
          const japanese = await translateToJapanese(data.name, _pokeType);
          const newPokemonList = [
            {
              id: data.id,
              name: data.name,
              iconImage: _iconImage,
              image: _image,
              pokeTsype: _pokeType,
              jpName: japanese.pokeName,
              jpType: japanese.pokeType,
            },
          ];
          setAllPokemonList((currentList) => {
            const updatedList = [...currentList, ...newPokemonList];
            return updatedList.sort((a, b) => a.id - b.id);
          });
        });
    });
  };

  const getAllPokemonList = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .catch((error) => {
        throw new Error(`Error${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {pokemonList?.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.jpName}
              image={pokemon.image}
              iconImage={pokemon.iconImage}
              pokeType={pokemon.jpType}
              key={index}
            />
          ))}
        </div>
        {isLoading ? (
          <div className="load-more">now loading...</div>
        ) : (
          <button className="load-more" onClick={getAllPokemonList}>
            もっとみる！
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
