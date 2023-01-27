import { fireEvent, render, screen } from "@testing-library/react";
import { usePokemonContext } from "../../../context/Pokemons";
import { mockPokemons } from "../../../mocks/mockPokemons";
import Detail from "./Detail";

let mockupdatePokemon = jest.fn();
let mockIdPokemon = "teste1";
let mockInternoPokemon = mockPokemons;
let mockProvider = {
  pokemons: mockInternoPokemon,
  updatePokemon: mockupdatePokemon,
};

jest.mock("../../../context/Pokemons");
jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: mockIdPokemon }),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../services/api/getDadosApi", () => ({
  getDadosApiPokeWith: (url, setPoke) => {
    setPoke({
      name: "teste4",
      url: "url3",
      detail: {
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
      },
    });
  },
}));

describe("Test component Detail", () => {
  it("render Component", () => {
    renderComponent();

    expect(screen.getByTestId("img-detail")).toBeInTheDocument();
  });

  it("click save", () => {
    renderComponent();

    const btnSave = screen.getByTestId("btn-save-pokmon");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);
  });

  it("click voltar", () => {
    renderComponent();

    const btnSave = screen.getByTestId("btn-voltar");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);
  });

  it("change input experience", () => {
    renderComponent();

    const inputExpe = screen.getByTestId("input-pokemon-experience");
    expect(inputExpe).toBeInTheDocument();
    fireEvent.change(inputExpe, { target: { value: "12" } });

    expect(inputExpe.value).toEqual("12");
  });

  it("getDetail API", () => {
    mockIdPokemon = "teste4";
    renderComponent();

    const inputExpe = screen.getByTestId("input-pokemon-experience");
    expect(inputExpe).toBeInTheDocument();
    fireEvent.change(inputExpe, { target: { value: "12" } });

    expect(inputExpe.value).toEqual("12");
  });

  it("not Pokemons", () => {
    mockInternoPokemon = [];
    renderComponent();

    expect(screen.getByTestId("img-detail")).toBeInTheDocument();
  });

  const renderComponent = () => {
    usePokemonContext.mockImplementation(() => mockProvider);
    render(<Detail />);
  };
});
