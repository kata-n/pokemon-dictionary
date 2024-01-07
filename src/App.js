import { useEffect, useState } from "react";
import { PokemonThumbnails } from "./PokemonThumbnails";
import { translateToJapanese } from "./util/translate";

function App() {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [isLoading, setIsLoading] = useState(false);

  const createPokemonObject = (results) => {
    results.forEach((pokemon) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _pokeType = data.types[0].type.name;
          const japanese = await translateToJapanese(data.name, _pokeType);
          const newPokemonList = {
            id: data.id,
            name: data.name,
            iconImage: _iconImage,
            image: _image,
            pokeTsype: _pokeType,
            jpName: japanese.pokeName,
            jpType: japanese.pokeType,
          };
          setAllPokemonList((currentList) =>
            [...currentList, newPokemonList].sort((a, b) => a.id - b.id)
          );
        });
    });
  };

  const getAllPokemonList = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // setAllPokemonList(data.results);
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllPokemonList();
  }, []);

  return (
    <div className="app-container">
      <h1>ポケモン図鑑</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemonList.map((pokemon, index) => (
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
