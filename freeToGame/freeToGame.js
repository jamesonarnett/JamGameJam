// year at bottom
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const gamesList = document.getElementById("gamesList");

const fetchGames = () => {
  let games = [];
  for (let i = 1; i <= 26; i++) {
    games.push(
      fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${i}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key":
              "50c7194bdamshb0eb8a360c84412p1ad793jsn94b395dbc2ad",
          },
        }
      ).then((response) => response.json())
    );
  }

  Promise.all(games).then((results) => {
    const game = results.map((data) => ({
      title: data.title,
      thumbnail: data.thumbnail,
      genre: data.genre,
      platform: data.platform,
      description: data.short_description,
      url: data.game_url,
    }));
    renderGame(game);
  });
};

const renderGame = (data) => {
  console.log(data);
  const gameHTML = data
    .map(
      (games) => `
  <div class="game">
  <h2 class="gameTitle">${games.title}</h2>
  <img src="${games.thumbnail}" />
  <ul class="list">
  <li class="listItemL" >${games.genre}</li>
  <li class="listItemR" >${games.platform}</li>
  </ul>
  <br />
  <p>${games.description}</p>
  <p>Play for free---><a target=_blank href="${games.url}"> HERE </a></p>
  </div>
  `
    )
    .join("");

  gamesList.innerHTML = gameHTML;
};

fetchGames();
