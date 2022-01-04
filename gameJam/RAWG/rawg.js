// year at bottom
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const input = document.getElementById("input");
const button = document.getElementById("button");
const content = document.getElementById("content");
const hideDiv = document.getElementById("hideDiv");
const hideP = document.getElementById("hideP");
const textInputDiv = document.getElementById("textInputDiv");
const line = document.getElementById("line");

const search = () => {
  button.addEventListener("click", (e) => {
    hideDiv.classList.add("hideDiv");
    hideP.classList.add("hideDiv");
    setTimeout(() => {
      hideDiv.classList.add("divGone");
      hideP.classList.add("divGone");
      textInputDiv.classList.add("afterTransition");
      line.classList.remove("hidden");
    }, 1000);

    let slug = input.value.split(" ").join("-").toLowerCase();
    fetch(
      `https://rawg-video-games-database.p.rapidapi.com/games/${slug}?key=593befac98e144a9b7b14f5e2380d759`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            "50c7194bdamshb0eb8a360c84412p1ad793jsn94b395dbc2ad",
        },
      }
    )
      .then((response) => {
        response = response.json().then((game) => {
          console.log(game);
          if (game.name === undefined) {
            alert(
              'I am sorry. The game you chose returned "undefined", or empty. Please check your spelling, and include the ENTIRE name in your query. "Grand theft auto san andreas"'
            );
          }

          displayGame(game);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

const displayGame = (game) => {
  let url = game.metacritic_url;

  let metaCriticHTML = `
  <div class="metaBtn">
  <a target="_blank" href="${url}">
  <button
  style="color: black;"
    class="btn btn-info"
    alt="img for  metacritic url"
    src="${game.background_image_addtional}"
  >MetaCritic review</button>
</a>
</div>
  `;

  const gameHTML = `
  
  
    <h1 class="gameTitle">${game.name}
    <span>${url !== "" ? metaCriticHTML : " "}</span>
    </h1>
   
    <div class="gameTextDiv">
    <p class="gameText">${game.description}</p>

    </div>

    <img class="gameImg" alt="chosen game background" src="${
      game.background_image
    }"/>
   
    
 
  
  `;

  content.innerHTML = gameHTML;
};

search();
