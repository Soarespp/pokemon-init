import React from "react";
import { usePokemonContext } from "../../context/Pokemons";
import { getDadosApiPoke } from "../../services/api/getDadosApi";
import Card from "../Card/Card";

const ListPokemons = () => {
  const { pokemons, stateGeral, setValuesPokemons } = usePokemonContext();
  const readMore = () => {
    getDadosApiPoke(setValuesPokemons, pokemons?.length + 1);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "500px",
      }}
      data-testid="listaPokemon"
    >
      {pokemons?.length > 0 &&
        pokemons
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }

            return 0;
          })
          .map((poke) => <Card pokemon={poke} key={poke.name} />)}
      <button
        data-testid="btn-readMore"
        onClick={readMore}
        disabled={!stateGeral?.next}
      >
        Load more
      </button>
    </div>
  );
};

export default ListPokemons;
