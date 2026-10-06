/* =========================================
   CALCULATE OVERALL
========================================= */

function calculateOverall(player) {

    let total = 0;

    let count = 0;

    for (const mode of Object.keys(gamemodes)) {

        const points = player[mode];

        if (typeof points === "number") {

            total += points;

            count++;

        }

    }

    if (count === 0) {
        return 0;
    }

    return Math.round(total / count);
}


/* =========================================
   TIER FROM POINTS
========================================= */

function getTier(points) {

    if (points >= 950) {
        return "HT1";
    }

    if (points >= 900) {
        return "LT1";
    }

    if (points >= 850) {
        return "HT2";
    }

    if (points >= 800) {
        return "LT2";
    }

    if (points >= 750) {
        return "HT3";
    }

    if (points >= 700) {
        return "LT3";
    }

    if (points >= 650) {
        return "HT4";
    }

    if (points >= 600) {
        return "LT4";
    }

    if (points >= 550) {
        return "HT5";
    }

    return "LT5";
}


/* =========================================
   HEAD IMAGE
========================================= */

function getHead(playerName) {

    return `
        <img
            class="head"
            src="https://mc-heads.net/avatar/${encodeURIComponent(playerName)}/44"
            alt="${playerName}"
            loading="lazy"
        >
    `;
}


/* =========================================
   PLAYER ROW
========================================= */

function createPlayerRow(
    player,
    position,
    points
) {

    const tier = getTier(points);

    return `

        <div class="player">

            <div class="position">
                #${position}
            </div>

            ${getHead(player.name)}

            <div class="player-info">

                <div class="player-name">
                    ${player.name}
                </div>

                <div class="player-rank">
                    ${tier}
                </div>

            </div>

            <div class="points">

                ${points.toLocaleString()}
                pts

            </div>

            <div class="tier ${tier}">

                ${tier}

            </div>

        </div>

    `;
}


/* =========================================
   OVERALL
========================================= */

function showOverall() {

    document
        .getElementById("overallSection")
        .classList.remove("hidden");

    document
        .getElementById("modesSection")
        .classList.remove("hidden");

    document
        .getElementById("gamemodePage")
        .classList.add("hidden");

    document
        .getElementById("searchSection")
        .classList.add("hidden");

    document
        .getElementById("searchInput")
        .value = "";

    renderOverall();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   RENDER OVERALL
========================================= */

function renderOverall() {

    const leaderboard =
        document.getElementById(
            "overallLeaderboard"
        );

    const sorted =
        players
            .map(player => ({

                player: player,

                points:
                    calculateOverall(player)

            }))
            .sort(
                (a, b) =>
                    b.points - a.points
            );


    leaderboard.innerHTML = "";


    sorted.forEach((entry, index) => {

        leaderboard.innerHTML +=

            createPlayerRow(
                entry.player,
                index + 1,
                entry.points
            );

    });


    document.getElementById(
        "overallPlayerCount"
    ).textContent =
        `${players.length} players`;
}


/* =========================================
   GAMEMODE GRID
========================================= */

function renderGamemodes() {

    const grid =
        document.getElementById(
            "gamemodeGrid"
        );

    grid.innerHTML = "";


    for (const key of Object.keys(gamemodes)) {

        const mode =
            gamemodes[key];


        const card =
            document.createElement("div");


        card.className =
            "gamemode-card";


        card.onclick =
            () => showGamemode(key);


        card.innerHTML = `

            <div>

                <div class="mode-icon">
                    ${mode.icon}
                </div>

                <div class="mode-name">
                    ${mode.name}
                </div>

            </div>

            <div class="mode-players">

                ${players.length} players

            </div>

        `;


        grid.appendChild(card);

    }

}


/* =========================================
   SHOW GAMEMODE
========================================= */

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];


    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("searchSection")
        .classList.add("hidden");


    document
        .getElementById("gamemodePage")
        .classList.remove("hidden");


    document
        .getElementById("gamemodeTitle")
        .textContent =
        mode.name;


    document
        .getElementById("gamemodeDescription")
        .textContent =
        mode.description;


    renderGamemode(modeKey);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   RENDER GAMEMODE
========================================= */

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById(
            "gamemodeLeaderboard"
        );


    const sorted =
        players
            .map(player => ({

                player: player,

                points:
                    player[modeKey] || 0

            }))
            .sort(
                (a, b) =>
                    b.points - a.points
            );


    leaderboard.innerHTML = "";


    sorted.forEach((entry, index) => {

        leaderboard.innerHTML +=

            createPlayerRow(
                entry.player,
                index + 1,
                entry.points
            );

    });

}


/* =========================================
   SEARCH
========================================= */

function searchPlayer() {

    const input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    if (!input) {

        document
            .getElementById(
                "searchSection"
            )
            .classList.add("hidden");

        return;

    }


    document
        .getElementById(
            "overallSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "modesSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "gamemodePage"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "searchSection"
        )
        .classList.remove("hidden");


    const results =
        document.getElementById(
            "searchResults"
        );


    const found =
        players.filter(
            player =>
                player.name
                    .toLowerCase()
                    .includes(input)
        );


    results.innerHTML = "";


    found.forEach(player => {

        results.innerHTML +=

            createPlayerRow(
                player,
                "-",
                calculateOverall(player)
            );

    });


    if (found.length === 0) {

        results.innerHTML = `

            <div class="player">

                No players found.

            </div>

        `;

    }

}


/* =========================================
   SCROLL TO GAMEMODES
========================================= */

function scrollToModes() {

    document
        .getElementById("modesSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   START WEBSITE
========================================= */

renderOverall();

renderGamemodes();
