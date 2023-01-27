import { fireEvent, render, screen } from "@testing-library/react";
import { PokemonProvider } from "./PokemonProvider";
import { usePokemonContext } from ".";
import { mockPokemons } from "../../mocks/mockPokemons";

const DummyComponent = () => {
  const { pokemons, setValuesPokemons, updatePokemon } = usePokemonContext();
  return (
    <>
      <p>Teste</p>
      <button
        onClick={() =>
          setValuesPokemons({ results: [{ name: "novo", url: "urlnova" }] })
        }
        data-testid="setValuesPokemons"
      >
        setValuesPokemons
      </button>
      <button
        onClick={() => updatePokemon({ name: "novo", url: "urlnova" })}
        data-testid="updatePokemon"
      >
        updatePokemon
      </button>
      {pokemons?.map((item) => (
        <p>{item.name}</p>
      ))}
    </>
  );
};

jest.mock("../../services/api/getDadosApi", () => ({
  getDadosApiPoke: (setData) => {
    setData({ results: mockPokemons });
  },
}));

describe("pokemonProvider teste", () => {
  it("provider click", () => {
    buildProvider();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("render with pokemons", () => {
    buildProvider();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("click setValuesPokemons", () => {
    buildProvider();
    const btnValuesPokemons = screen.getByTestId("setValuesPokemons");
    expect(btnValuesPokemons).toBeInTheDocument();

    fireEvent.click(btnValuesPokemons);
  });

  it("click updatePokemon", () => {
    buildProvider();
    const btnValuesPokemons = screen.getByTestId("updatePokemon");
    expect(btnValuesPokemons).toBeInTheDocument();

    fireEvent.click(btnValuesPokemons);
  });

  const buildProvider = () => {
    render(
      <PokemonProvider>
        <DummyComponent />
      </PokemonProvider>
    );
  };
});
