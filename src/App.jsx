import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [activePokemon, setActivePokemon] = useState(0);

  //Function to fetch pokemon data
  const getPokemonData = (pokemonUrl) => {
    Axios.get(pokemonUrl).then((res) => {
      setPokemonData((currentData) => [...currentData, res.data]);
    });
  };

  //fetched data is not sorted, so data need to be sorted here:
  useEffect(() => {
    pokemonData.sort((a, b) => a.id - b.id);

    let arr = [...pokemonData];
    setFilteredPokemonData([...arr]);
  }, [pokemonData]);

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchValue}`).then(
      (res) => {
        setActivePokemon(res.data);
      }
    );
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

      return (
        <div className="pokemon-card" onClick={() => setActivePokemon(pokemon)}>
          <div
            className="pokemon-img"
            style={{ backgroundImage: img_url }}
          ></div>
          <p className="pokemon-id">#{pokemon.id}</p>
          <h3 className="pokemon-name">{pokemon.forms[0].name}</h3>
          <p className="pokemon-type">{getPokemonTypes()}</p>
        </div>
      );
    });
  };

  //Render selected pokemon
  const renderSelectedPokemon = () => {
    let pokemon = activePokemon;

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
        <img
          className="pokemon-img-artwork"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p className="pokemon-id">#{pokemon.id}</p>
        <h2 className="pokemon-name">{pokemon.forms[0].name}</h2>
        <p className="pokemon-type">{getPokemonTypes()}</p>
        <table className="pokemon-stats-container">{getPokemonStats()}</table>
      </div>
    );
  };

  const [offset, setOffset] = useState(9);
  const [loadPokemon, setLoadPokemon] = useState(false);

  const loadMore = () => {
    setLoadPokemon(true);

    Axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`
    ).then((res) => {
      const data = res.data.results;
      console.log(data);

      data.forEach((val, index) => {
        getPokemonData(val.url, index);
      });

      setOffset(offset + 9);
      setLoadPokemon(false);
    });
  };

  //Fetch all pokemon data (name & API url)
  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=9)`).then((res) => {
      const data = res.data.results;
      console.log(data);

      data.forEach((val, index) => {
        getPokemonData(val.url, index);
      });

      Axios.get(`https://pokeapi.co/api/v2/pokemon/1`).then((res) => {
        setActivePokemon(res.data);
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
              placeholder="Search Pokémon by name or id"
            />
            <button className="search-button" onClick={searchPokemon}>
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

          <div className="card-container">
            {renderAllPokemon()}
            <button className="load-more" onClick={loadMore}>
              {`${loadPokemon ? "Loading..." : "Load More"}`}
            </button>
          </div>
        </div>
        {activePokemon && renderSelectedPokemon()}
      </div>
    </div>
  );
}

export default App;
