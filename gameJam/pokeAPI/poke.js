const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

let pokeNum = Math.floor(Math.random() * (150 - 1 + 1)) + 1;

for (let i = 1; i <= pokeNum; i++) {
  const apiData = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    id: `${i}`,
  };

  const { url, type, id } = apiData;
  const apiUrl = `${url}${type}/${id}`;

  fetch(apiUrl)
    .then((data) => data.json())
    .then((pokemon) => generateHtml(pokemon));

  const generateHtml = (data) => {
    const html = `
  <div class="cardTitle">
  <p style="font-size: 32px; margin-bottom: -.3rem;">Your Lucky Pokemon!</p>
  ${data.name}</div>
  <img class="cardImg" src=${data.sprites.front_default}>
  <div class="details">
        <span>Height: ${data.height}</span>
        <span>Weight: ${data.weight}</span> <br />
        <span>Type: ${data.types[0].type.name}</span>
  </div> 
  `;
    const pokemonDiv = document.getElementById("pokemon");
    pokemonDiv.innerHTML = html;
  };
}
