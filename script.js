let currentMode = "Sword";

function showMode(mode) {

    currentMode = mode;

    document.getElementById("modeTitle").textContent = mode;

    const leaderboard =
        document.getElementById("leaderboard");

    leaderboard.innerHTML = "";

    let list = players[mode] || [];

    list.sort((a, b) => b.points - a.points);

    list.forEach((player, index) => {

        const div = document.createElement("div");

        div.className = "player";

        div.innerHTML = `
            <div class="rank">
                #${index + 1}
            </div>

            <div class="name">
                ${player.name}
            </div>

            <div>
                ${player.points} points
            </div>

            <div class="tier ${player.tier}">
                ${player.tier}
            </div>
        `;

        leaderboard.appendChild(div);
    });
}

showMode("Sword");
