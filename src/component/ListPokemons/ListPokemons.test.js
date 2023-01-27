import { fireEvent, render, screen } from "@testing-library/react";
import { usePokemonContext } from "../../context/Pokemons";
import ListPokemons from "./ListPokemons";
import { useNavigate } from "react-router-dom";
import { mockPokemons } from "../../mocks/mockPokemons";

let mockStateGeral = { next: true };
let mockSetValuePokemons = jest.fn();

let mockProvider = {
  pokemons: mockPokemons,
  stateGeral: mockStateGeral,
  setValuesPokemons: mockSetValuePokemons,
};

jest.mock("../../context/Pokemons");
jest.mock("react-router-dom");
jest.mock("../../services/api/getDadosApi", () => ({
  getDadosApiPoke: jest.fn(() => mockPokemons),
}));

describe("Teste listaPokemons", () => {
  it("test render coponent", () => {
    renderComponent();

    expect(screen.getByTestId("listaPokemon")).toBeInTheDocument();
  });

  it("click readMore", () => {
    renderComponent();

    const btnReadMore = screen.getByTestId("btn-readMore");
    expect(btnReadMore).toBeInTheDocument();
    fireEvent.click(btnReadMore);
  });

  const renderComponent = () => {
    usePokemonContext.mockImplementation(() => mockProvider);
    useNavigate.mockImplementation(() => ({
      navigate: jest.fn(),
      useParams: jest.fn(() => ({ id: 1 })),
    }));
    render(<ListPokemons />);
  };
});
