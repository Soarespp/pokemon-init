import { render, screen } from "@testing-library/react";
import App from "./App";
import { mockPokemons } from "./mocks/mockPokemons";

let mockStateGeral = { next: true };
let mockSetValuePokemons = jest.fn();

jest.mock("./context/Pokemons", () => ({
  usePokemonContext: () => ({
    pokemons: mockPokemons,
    stateGeral: mockStateGeral,
    setValuesPokemons: mockSetValuePokemons,
  }),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "teste1" }),
  useNavigate: () => jest.fn(),
}));

describe("teste App", () => {
  it("render App", () => {
    render(<App />);

    expect(screen.getByText(/Lista/i)).toBeInTheDocument();
  });
});
