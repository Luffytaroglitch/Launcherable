async function loadGames() {
  try {
    const res = await fetch("games.json");
    const games = await res.json();

    const gameGrid = document.getElementById("gameGrid");
    const gameFrame = document.getElementById("gameFrame");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const gameCount = document.getElementById("gameCount");
    const searchInput = document.getElementById("searchInput");

    gameGrid.innerHTML = "";
    const availableGames = games.filter(g => g.entry);

    gameCount.textContent = `${availableGames.length} Game${availableGames.length !== 1 ? "s" : ""}`;

    availableGames.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";

      card.innerHTML = `
        <div class="game-card-header">
          <div class="game-icon">🎮</div>
          <div class="game-info">
            <div class="game-title">${game.title}</div>
            <div class="game-status">
              <span class="status-dot"></span> Ready to play
            </div>
          </div>
        </div>
      `;

      card.onclick = () => {
        document.querySelectorAll(".game-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        welcomeScreen.style.display = "none";
        gameFrame.src = game.entry;
        gameFrame.classList.add("visible");
      };

      gameGrid.appendChild(card);
    });

    searchInput.addEventListener("input", e => {
      const search = e.target.value.toLowerCase();
      document.querySelectorAll(".game-card").forEach(card => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        card.style.display = title.includes(search) ? "block" : "none";
      });
    });
  } catch (err) {
    console.error("Error loading games:", err);
  }
}

loadGames();

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
