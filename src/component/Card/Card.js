import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ pokemon, key }) => {
  const navigate = useNavigate();
  return (
    <div
      key={key}
      style={{
        display: "flex",
        border: "2px solid black",
        margin: "2px",
        alignItems: "center",
        height: "25px",
      }}
      data-testid="card"
    >
      <p style={{ width: "90%", paddingLeft: "6px" }}>{pokemon.name}</p>
      <button
        style={{ height: "20px", margin: "2px" }}
        onClick={() => navigate(`/detail/${pokemon.name}`)}
        data-testid="btn-detail-pokemon"
      >
        Edit
      </button>
    </div>
  );
};

export default Card;
