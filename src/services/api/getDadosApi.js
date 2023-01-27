export const getDadosApiPoke = (onResult, page = 1) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${page}`)
    .then((response) => {
      if (!response.ok) throw Error();
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      onResult(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

export const getDadosApiPokeWith = async (url, setPoke) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setPoke(data);
    })
    .catch((error) => console.log(`Error pokemon ${error}`));
};
