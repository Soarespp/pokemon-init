import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("render teste Header", () => {
  it("Testando render", () => {
    renderComponent();

    const header = screen.getByTestId("header");

    expect(header).toBeInTheDocument();
  });

  const renderComponent = () => {
    render(<Header />);
  };
});
