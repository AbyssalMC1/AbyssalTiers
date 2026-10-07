/* =========================================================
   ABYSSAL TIERS — MAIN SCRIPT
========================================================= */


/* =========================================================
   GET TIER
========================================================= */

function getTier(points) {

    points = Number(points) || 0;

    if (points >= 900) return "HT1";
    if (points >= 800) return "LT1";

    if (points >= 700) return "HT2";
    if (points >= 600) return "LT2";

    if (points >= 500) return "HT3";
    if (points >= 400) return "LT3";

    if (points >= 300) return "HT4";
    if (points >= 200) return "LT4";

    if (points >= 100) return "HT5";

    return "LT5";
}


/* =========================================================
   MINECRAFT HEAD
========================================================= */

function getHead(name) {

    return `
        <img
            class="player-head"
            src="https://mc-heads.net/avatar/${encodeURIComponent(name)}/44"
            alt="${name}"
        >
    `;
}


/* =========================================================
   CALCULATE OVERALL
========================================================= */

function calculateOverall(player) {

    let total = 0;
    let count = 0;

    Object.keys(gamemodes).forEach(modeKey => {

        const points = Number(player[modeKey]);

        if (!isNaN(points)) {

            total += points;
            count++;

        }

    });

    if (count === 0) {
        return 0;
    }

    return Math.round(total / count);
}


/* =========================================================
   CREATE PLAYER ROW
========================================================= */

function createPlayerRow(player, position, points) {

    const tier = getTier(points);

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `

        <div class="player-position">
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

        <div class="player-points">
            ${Number(points).toLocaleString()} pts
        </div>

        <div class="player-tier tier-${tier.toLowerCase()}">
            ${tier}
        </div>

    `;

    row.addEventListener("click", () => {

        showPlayerProfile(player);

    });

    return row;
}


/* =========================================================
   SHOW OVERALL
========================================================= */

function showOverall() {

    const overall =
        document.getElementById("overallSection");

    const modes =
        document.getElementById("modesSection");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const profile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "block";
        overall.classList.remove("hidden");
    }

    if (modes) {
        modes.style.display = "block";
        modes.classList.remove("hidden");
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
        gamemodePage.classList.add("hidden");
    }

    if (profile) {
        profile.style.display = "none";
        profile.classList.add("hidden");
    }
}


/* =========================================================
   RENDER OVERALL
========================================================= */

function renderOverall() {

    const leaderboard =
        document.getElementById("overallLeaderboard");

    if (!leaderboard) {
        return;
    }

    leaderboard.innerHTML = "";

    const rankedPlayers = players
        .map(player => {

            return {
                player: player,
                points: calculateOverall(player)
            };

        })
        .sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            return a.player.name.localeCompare(
                b.player.name
            );

        });


    rankedPlayers.forEach((entry, index) => {

        const row = createPlayerRow(
            entry.player,
            index + 1,
            entry.points
        );

        leaderboard.appendChild(row);

    });


    const playerCount =
        document.getElementById("overallPlayerCount");

    if (playerCount) {

        playerCount.textContent =
            `${players.length} players`;

    }
}


/* =========================================================
   RENDER GAMEMODES
========================================================= */

function renderGamemodes() {

    const grid =
        document.getElementById("gamemodeGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    Object.entries(gamemodes).forEach(
        ([modeKey, mode]) => {

            const card =
                document.createElement("div");

            card.className =
                "gamemode-card";


            let iconHTML = "";


            if (
                mode.icon &&
                (
                    mode.icon.startsWith("http://") ||
                    mode.icon.startsWith("https://") ||
                    mode.icon.endsWith(".png") ||
                    mode.icon.endsWith(".jpg") ||
                    mode.icon.endsWith(".jpeg") ||
                    mode.icon.endsWith(".webp")
                )
            ) {

                iconHTML = `
                    <div class="mode-icon">
                        <img
                            src="${mode.icon}"
                            alt="${mode.name}"
                        >
                    </div>
                `;

            } else {

                iconHTML = `
                    <div class="mode-icon">
                        <span>${mode.icon || ""}</span>
                    </div>
                `;

            }


            card.innerHTML = `

                ${iconHTML}

                <div class="mode-name">
                    ${mode.name}
                </div>

                <div class="mode-players">
                    ${players.length} players
                </div>

            `;


            card.addEventListener("click", () => {

                showGamemode(modeKey);

            });


            grid.appendChild(card);

        }
    );
}


/* =========================================================
   SHOW GAMEMODE
========================================================= */

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];

    if (!mode) {
        return;
    }


    const overall =
        document.getElementById("overallSection");

    const modes =
        document.getElementById("modesSection");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const profile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "none";
        overall.classList.add("hidden");
    }

    if (modes) {
        modes.style.display = "none";
        modes.classList.add("hidden");
    }

    if (profile) {
        profile.style.display = "none";
        profile.classList.add("hidden");
    }

    if (gamemodePage) {
        gamemodePage.style.display = "block";
        gamemodePage.classList.remove("hidden");
    }


    const title =
        document.getElementById("gamemodeTitle");

    if (title) {
        title.textContent = mode.name;
    }


    const description =
        document.getElementById("gamemodeDescription");

    if (description) {
        description.textContent =
            mode.description || "";
    }


    renderGamemode(modeKey);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   RENDER GAMEMODE
========================================================= */

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById("gamemodeLeaderboard");

    if (!leaderboard) {
        return;
    }

    leaderboard.innerHTML = "";


    const rankedPlayers = players
        .map(player => {

            return {
                player: player,
                points: Number(player[modeKey]) || 0
            };

        })
        .sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            return a.player.name.localeCompare(
                b.player.name
            );

        });


    rankedPlayers.forEach((entry, index) => {

        const row = createPlayerRow(
            entry.player,
            index + 1,
            entry.points
        );

        leaderboard.appendChild(row);

    });
}


/* =========================================================
   PLAYER PROFILE
========================================================= */

function showPlayerProfile(player) {

    if (!player) {
        return;
    }


    const overall =
        document.getElementById("overallSection");

    const modes =
        document.getElementById("modesSection");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const profile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "none";
        overall.classList.add("hidden");
    }

    if (modes) {
        modes.style.display = "none";
        modes.classList.add("hidden");
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
        gamemodePage.classList.add("hidden");
    }

    if (!profile) {
        return;
    }


    profile.style.display = "block";
    profile.classList.remove("hidden");


    const overallPoints =
        calculateOverall(player);

    const overallTier =
        getTier(overallPoints);


    let modesHTML = "";


    Object.entries(gamemodes).forEach(
        ([modeKey, mode]) => {

            const points =
                Number(player[modeKey]) || 0;

            const tier =
                getTier(points);


            let iconHTML = "";


            if (
                mode.icon &&
                (
                    mode.icon.startsWith("http://") ||
                    mode.icon.startsWith("https://") ||
                    mode.icon.endsWith(".png") ||
                    mode.icon.endsWith(".jpg") ||
                    mode.icon.endsWith(".jpeg") ||
                    mode.icon.endsWith(".webp")
                )
            ) {

                iconHTML = `
                    <img
                        class="profile-mode-icon"
                        src="${mode.icon}"
                        alt="${mode.name}"
                    >
                `;

            } else {

                iconHTML = `
                    <span class="profile-mode-icon-text">
                        ${mode.icon || ""}
                    </span>
                `;

            }


            modesHTML += `

                <div
                    class="profile-mode-row"
                    data-mode="${modeKey}"
                >

                    <div class="profile-mode-name">

                        ${iconHTML}

                        <span>
                            ${mode.name}
                        </span>

                    </div>

                    <div class="profile-mode-points">
                        ${points} pts
                    </div>

                    <div
                        class="profile-mode-tier tier-${tier.toLowerCase()}"
                    >
                        ${tier}
                    </div>

                </div>

            `;

        }
    );


    profile.innerHTML = `

        <a
            href="#overallSection"
            class="back-button"
        >
            ← Back to Overall
        </a>


        <div class="profile-card">

            ${getHead(player.name)}

            <div>

                <h2>
                    ${player.name}
                </h2>

            </div>


            <div class="profile-overall">

                <span>
                    Overall
                </span>

                <strong>
                    ${overallPoints} pts
                </strong>

                <div
                    class="profile-mode-tier tier-${overallTier.toLowerCase()}"
                >
                    ${overallTier}
                </div>

            </div>

        </div>


        <div class="section-title">

            <div>

                <span class="section-small">
                    RANKINGS
                </span>

                <h2>
                    Gamemodes
                </h2>

            </div>

        </div>


        <div class="profile-modes">

            ${modesHTML}

        </div>

    `;


    profile
        .querySelectorAll(".profile-mode-row")
        .forEach(row => {

            row.addEventListener("click", () => {

                const mode =
                    row.dataset.mode;

                showGamemode(mode);

            });

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SHOW MAIN PAGE
========================================================= */

function showMainPage(scrollTarget = null) {

    const overall =
        document.getElementById("overallSection");

    const modes =
        document.getElementById("modesSection");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const profile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "block";
        overall.classList.remove("hidden");
    }

    if (modes) {
        modes.style.display = "block";
        modes.classList.remove("hidden");
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
        gamemodePage.classList.add("hidden");
    }

    if (profile) {
        profile.style.display = "none";
        profile.classList.add("hidden");
    }


    if (scrollTarget) {

        setTimeout(() => {

            const target =
                document.getElementById(scrollTarget);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 50);

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {


    /* OVERALL */

    const overallLinks =
        document.querySelectorAll(
            'a[href="#overallSection"]'
        );


    overallLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showMainPage("overallSection");

        });

    });


    /* GAMEMODES */

    const gamemodeLinks =
        document.querySelectorAll(
            'a[href="#modesSection"]'
        );


    gamemodeLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showMainPage("modesSection");

        });

    });


    /* BACK BUTTON */

    document
        .querySelectorAll(".back-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showMainPage("overallSection");

                }
            );

        });

}


/* =========================================================
   START WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderOverall();

        renderGamemodes();

        setupNavigation();

    }
);
