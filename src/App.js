import './App.css';
import PokemonThumbnails from './PokemonThumbnails'

function App() {
  const pokemonData = {
    id:1,
    name:'フシギダネ',
    image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    pokeType: '草'
  }
  return (
    <div className="App">
      <PokemonThumbnails id={pokemonData.id} name={pokemonData.name} image={pokemonData.image} pokeType={pokemonData.pokeType} />
    </div>
  );
}

export default App;
