import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonContext } from "../../../context/Pokemons";
import { getDadosApiPokeWith } from "../../../services/api/getDadosApi";
import Header from "../../Header/Header";
import { Title, Formulario } from "./Detail.style";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  const { pokemons, updatePokemon } = usePokemonContext();

  const updateDetail = (value) => {
    setPokemon((oldValue) => ({ ...oldValue, detail: value }));
  };

  useEffect(() => {
    if (pokemons.length > 0) {
      setPokemon(pokemons.find((item) => item.name === id));
    }
  }, [pokemons, id]);

  useEffect(() => {
    !!pokemon &&
      !pokemon.detail &&
      getDadosApiPokeWith(pokemon.url, updateDetail);
  }, [pokemon]);

  const handleChange = (name, value) => {
    const detailPokemon = { ...pokemon.detail, [name]: value };

    setPokemon((oldValue) => ({ ...oldValue, detail: detailPokemon }));
  };

  const handleSubmite = () => {
    updatePokemon(pokemon);
  };

  return (
    <>
      <Header />
      <Formulario>
        <Title>
          <p>Name:</p>
          <p>{pokemon?.detail?.name}</p>
        </Title>
        <div
          style={{
            height: "350px",
            width: "350px",
            backgroundImage: `url(${pokemon?.detail?.sprites?.front_default})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "auto",
            backgroundSize: "cover",
            margin: "auto",
          }}
          data-testid="img-detail"
        />

        <div style={{ padding: "6px" }}>
          <label xs={6}>Experience:</label>
          <input
            xs={6}
            value={pokemon?.detail?.base_experience}
            data-testid="input-pokemon-experience"
            onChange={(event) =>
              handleChange("base_experience", event.target.value)
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px",
          }}
        >
          <button onClick={() => navigate("/")} data-testid="btn-voltar">
            Voltar
          </button>
          <button onClick={handleSubmite} data-testid="btn-save-pokmon">
            Save
          </button>
        </div>
      </Formulario>
    </>
  );
};

export default Detail;
