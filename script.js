async function loadGames() {
  try {
    const res = await fetch("games.json");
    const games = await res.json();

    const gameGrid = document.getElementById("gameGrid");
    const gameFrame = document.getElementById("gameFrame");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const gameCount = document.getElementById("gameCount");
    const searchInput = document.getElementById("searchInput");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    gameGrid.innerHTML = "";

    const totalGames = games.length;
    gameCount.textContent = `${totalGames} Game${totalGames !== 1 ? "s" : ""}`;

    let activeCard = null;

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";

      card.innerHTML = `
        <div class="game-card-header">
          <div class="game-icon">🎮</div>
          <div class="game-info">
            <div class="game-title">${game.title}</div>
            <div class="game-status">
              <span class="status-dot"></span><span>Ready to play</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        if (activeCard) activeCard.classList.remove("active");
        card.classList.add("active");
        activeCard = card;

        welcomeScreen.classList.add("hidden");
        gameFrame.src = game.entry;
        gameFrame.classList.add("visible");
        fullscreenBtn.style.display = "block";
      });

      gameGrid.appendChild(card);
    });

    searchInput.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const cards = gameGrid.querySelectorAll(".game-card");

      cards.forEach(card => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
      });
    });

    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        gameFrame.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
      } else {
        document.exitFullscreen();
      }
    });
  } catch (err) {
    console.error("Failed to load games:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadGames);
