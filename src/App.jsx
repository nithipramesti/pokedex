import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  // const [loadMore, setLoadMore] = useState(
  //   "https://pokeapi.co/api/v2/pokemon?limit=20"
  // );

  // const getPokemonData = async () => {
  //   const res = await fetch(loadMore);
  //   const data = await res.json();

  //   setLoadMore(data.next);

  //   function createPokemonObject(results) {
  //     results.forEach(async (pokemon) => {
  //       const res = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
  //       );
  //       const data = await res.json();

  //       setPokemonData((currentData) => [...currentData, data]);
  //     });
  //   }
  //   createPokemonObject(data.results);
  //   await console.log(pokemonData);
  // };

  // useEffect(() => {
  //   getPokemonData();
  // }, []);

  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

  const [activePokemon, setActivePokemon] = useState(2);

  //Function for fetching pokemon data
  const getPokemonData = (pokemonUrl, index) => {
    Axios.get(pokemonUrl).then((res) => {
      setPokemonData((currentData) => [...currentData, res.data]);
      // console.log(res.data.forms[0].name)
    });
  };

  useEffect(() => {
    pokemonData.sort((a, b) => a.id - b.id);

    let arr = [...pokemonData];
    setFilteredPokemonData([...arr]);
  }, [pokemonData]);

  //Function for handling search
  const searchHandler = (event) => {
    let filteredData = [];
    let searchValue = event.target.value;
    filteredData = pokemonData.filter((val) => {
      if (searchValue === "" || isNaN(searchValue)) {
        return val.forms[0].name.includes(searchValue.toLowerCase());
      } else {
        return val.id == searchValue;
      }
    });
    setFilteredPokemonData([...filteredData]);

    console.log(pokemonData);
    console.log(event.target.value.toLowerCase());
  };

  //Render all Pokemon cards
  const renderAllPokemon = () => {
    console.log(pokemonData);

    return filteredPokemonData.map((pokemon) => {
      const img_url = `url(${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default})`;

      const getPokemonTypes = () => {
        return pokemon.types.map((val) => {
          return <span>{val.type.name}</span>;
        });
      };
      // const img_color =

      return (
        <div
          className="pokemon-card"
          onClick={() => setActivePokemon(pokemon.id - 1)}
        >
          <div
            className="pokemon-img"
            style={{ backgroundImage: img_url }}
          ></div>
          <p className="pokemon-id">
            {pokemon.id < 100
              ? pokemon.id < 10
                ? `#00${pokemon.id}`
                : `#0${pokemon.id}`
              : `#${pokemon.id}`}
          </p>
          <h3 className="pokemon-name">{pokemon.forms[0].name}</h3>
          <p className="pokemon-type">{getPokemonTypes()}</p>
        </div>
      );
    });
  };

  //Render selected pokemon
  const renderSelectedPokemon = () => {
    let pokemon = pokemonData[activePokemon];

    const img_url = pokemon.sprites.other["official-artwork"].front_default;
    const getPokemonTypes = () => {
      return pokemon.types.map((val) => {
        return <span>{val.type.name}</span>;
      });
    };

    return (
      <div className="selected-pokemon-container">
        <img className="pokemon-img-artwork" src={img_url} alt="" />
        <p className="pokemon-id">
          {pokemon.id < 100
            ? pokemon.id < 10
              ? `#00${pokemon.id}`
              : `#0${pokemon.id}`
            : `#${pokemon.id}`}
        </p>
        <h2 className="pokemon-name">{pokemon.forms[0].name}</h2>
        <p className="pokemon-type">{getPokemonTypes()}</p>
      </div>
    );
  };

  //Fetch all pokemon data (name & API url)
  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`).then((res) => {
      const data = res.data.results;
      console.log(data);

      data.forEach((val, index) => {
        getPokemonData(val.url, index);
      });
    });
  }, []);

  return (
    <div className="app">
      <h1>Pokédex</h1>

      <div className="pokedex-container">
        <div className="all-pokemon-container">
          <div className="search-container">
            <input
              type="text"
              name="searchBar"
              onChange={searchHandler}
              id="search-bar"
              placeholder="Search Pokémon by name or number"
            />
            <button className="search-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>

          <div className="card-container">{renderAllPokemon()}</div>
        </div>
        {pokemonData[activePokemon] && renderSelectedPokemon()}
      </div>
    </div>
  );
}

export default App;
