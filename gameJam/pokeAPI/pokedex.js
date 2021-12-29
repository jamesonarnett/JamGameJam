const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((data) => data.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    console.log(pokemon);
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTML = pokemon
    .map(
      (poke) => `
     
      <li class="card">
        <img class="cardImg" src="${poke.image}"/>
        <h2 class="cardTitle">${poke.id}. ${poke.name}</h2>
        <p class="cardText">Type: ${poke.type}</p>
      </li>
  
      `
    )
    .join("");
  pokedex.innerHTML = pokemonHTML;
};

fetchPokemon();
