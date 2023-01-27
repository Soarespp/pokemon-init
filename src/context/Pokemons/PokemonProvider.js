import React, { useEffect, useState } from "react";
import { getDadosApiPoke } from "../../services/api/getDadosApi";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [data, setData] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateGeral, setStateGeral] = useState({
    next: false,
    previous: false,
  });

  const loadDataPokemons = () => {
    getDadosApiPoke(setData);
  };

  const updatePokemon = (poke) => {
    const listaPoke = pokemons.filter((item) => item.name !== poke.name);
    setPokemons([...listaPoke, poke]);
  };

  useEffect(() => {
    loadDataPokemons();
  }, []);

  const setValuesPokemons = (pokes) => {
    setPokemons((oldPokes) => [...oldPokes, ...pokes?.results]);
    setStateGeral({ next: pokes.next, previous: pokes.previous });
  };
  const setValuesLoading = (loading) => setLoading(loading);

  useEffect(() => {
    if (data && pokemons.length === 0) {
      setPokemons(data?.results);
      setStateGeral({ next: data?.next, previous: data?.previous });
    }
  }, [data, pokemons?.length]);

  return (
    <PokemonContext.Provider
      value={{
        stateGeral,
        pokemons,
        loading,
        loadDataPokemons,
        setValuesPokemons,
        setValuesLoading,
        updatePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.displayName = "PokemonProvider";
