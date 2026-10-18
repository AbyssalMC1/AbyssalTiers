const searchInput = document.getElementById("modeSearch");
const gameCards = Array.from(document.querySelectorAll(".game-card"));
const emptyState = document.getElementById("emptyState");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    gameCards.forEach((card) => {
      const matches = card.dataset.mode.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  });
}
