// year at bottom
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

fetch(
  "https://rawg-video-games-database.p.rapidapi.com/games?key=a29976446de649d893a9256fce4e8789",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": "50c7194bdamshb0eb8a360c84412p1ad793jsn94b395dbc2ad",
    },
  }
)
  .then((response) => {
    let data = response.json();
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
