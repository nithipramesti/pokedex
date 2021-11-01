import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  const [filteredPokemonData, setFilteredPokemonData] = useState([]);

  const [activePokemon, setActivePokemon] = useState(0);

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

    const getPokemonStats = () => {
      let baseStat = [];
      let totalStatVal = 0;

      baseStat = pokemon.stats.map((val, index) => {
        const statName = [
          "HP",
          "Attack",
          "Defense",
          "Sp. Atk",
          "Sp. Def",
          "Speed",
        ];
        const barWidth = (val.base_stat / 255) * 100;

        totalStatVal += val.base_stat;

        return (
          <tr>
            <td className="stat-name">{statName[index]}</td>
            <td className="stat-val">{val.base_stat}</td>
            <td>
              <div
                className={`stat-bar ${
                  val.base_stat > 149
                    ? `ultimate-high`
                    : val.base_stat > 124
                    ? `very-high`
                    : val.base_stat > 99
                    ? `high`
                    : ``
                }`}
                style={{ width: `${barWidth}%` }}
              ></div>
            </td>
          </tr>
        );
      });

      baseStat.push(
        <tr>
          <td className="stat-name">Total</td>
          <td className="stat-val total">{totalStatVal}</td>
          <td></td>
        </tr>
      );

      return baseStat;
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
        <table className="pokemon-stats-container">{getPokemonStats()}</table>
      </div>
    );
  };

  //Fetch all pokemon data (name & API url)
  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=386`).then((res) => {
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
