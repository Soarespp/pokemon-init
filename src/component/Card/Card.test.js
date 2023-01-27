import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";

let mockPokemon = { name: "teste pokemon" };

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "teste1" }),
  useNavigate: () => jest.fn(),
}));

describe("render teste Card", () => {
  it("Testando render", () => {
    renderComponent();

    const header = screen.getByTestId("card");

    expect(header).toBeInTheDocument();
  });

  it("click detail pokemon", () => {
    renderComponent();

    const btnSave = screen.getByTestId("btn-detail-pokemon");
    expect(btnSave).toBeInTheDocument();
    fireEvent.click(btnSave);
  });

  const renderComponent = () => {
    render(<Card pokemon={mockPokemon} key={mockPokemon.name} />);
  };
});
