import React from "react";

const Header = () => {
  return (
    <div
      style={{
        height: "60px",
        borderBottom: "2px solid black",
        marginBottom: "6px",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
      }}
      data-testid="header"
    >
      <h1>Lista Pokemons</h1>
    </div>
  );
};

export default Header;
