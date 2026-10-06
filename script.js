/* =====================================================
   ABYSSAL TIERS - SCRIPT.JS
   ===================================================== */


/* =====================================================
   1. CALCULATE OVERALL POINTS
   ===================================================== */

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


/* =====================================================
   2. GET TIER FROM POINTS
   ===================================================== */

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


/* =====================================================
   3. MINECRAFT HEAD
   ===================================================== */

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


/* =====================================================
   4. CREATE PLAYER ROW
   ===================================================== */

function createPlayerRow(player, position, points) {

    const tier = getTier(points);

    return `

        <div
            class="player"
            onclick="showPlayerProfile('${escapeHTML(player.name)}')"
            style="cursor: pointer;"
        >

            <div class="position">
                #${position}
            </div>


            ${getHead(player.name)}


            <div class="player-info">

                <div class="player-name">
                    ${escapeHTML(player.name)}
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


/* =====================================================
   5. ESCAPE HTML
   ===================================================== */

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   6. SHOW OVERALL
   ===================================================== */

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


    const profile =
        document.getElementById("playerProfile");


    if (profile) {

        profile.classList.add("hidden");

    }


    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.value = "";

    }


    renderOverall();


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =====================================================
   7. RENDER OVERALL LEADERBOARD
   ===================================================== */

function renderOverall() {

    const leaderboard =
        document.getElementById(
            "overallLeaderboard"
        );


    if (!leaderboard) {
        return;
    }


    const sortedPlayers = players

        .map(player => ({

            player: player,

            points:
                calculateOverall(player)

        }))

        .sort((a, b) => {

            return b.points - a.points;

        });


    leaderboard.innerHTML = "";


    sortedPlayers.forEach((entry, index) => {

        leaderboard.innerHTML +=

            createPlayerRow(

                entry.player,

                index + 1,

                entry.points

            );

    });


    const playerCount =
        document.getElementById(
            "overallPlayerCount"
        );


    if (playerCount) {

        playerCount.textContent =
            `${players.length} players`;

    }
}


/* =====================================================
   8. RENDER GAMEMODE CARDS
   ===================================================== */

function renderGamemodes() {

    const grid =
        document.getElementById(
            "gamemodeGrid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    for (const key of Object.keys(gamemodes)) {

        const mode =
            gamemodes[key];


        const card =
            document.createElement("div");


        card.className =
            "gamemode-card";


        card.onclick = function () {

            showGamemode(key);

        };


        card.innerHTML = `

            <div>

                <div class="mode-icon">

                    ${mode.icon}

                </div>


                <div class="mode-name">

                    ${escapeHTML(mode.name)}

                </div>

            </div>


            <div class="mode-players">

                ${players.length} players

            </div>

        `;


        grid.appendChild(card);

    }
}


/* =====================================================
   9. SHOW GAMEMODE
   ===================================================== */

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];


    if (!mode) {
        return;
    }


    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("searchSection")
        .classList.add("hidden");


    const profile =
        document.getElementById(
            "playerProfile"
        );


    if (profile) {

        profile.classList.add("hidden");

    }


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


/* =====================================================
   10. RENDER GAMEMODE LEADERBOARD
   ===================================================== */

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById(
            "gamemodeLeaderboard"
        );


    if (!leaderboard) {
        return;
    }


    const sortedPlayers = players

        .map(player => ({

            player: player,

            points:
                typeof player[modeKey] === "number"
                    ? player[modeKey]
                    : 0

        }))

        .sort((a, b) => {

            return b.points - a.points;

        });


    leaderboard.innerHTML = "";


    sortedPlayers.forEach((entry, index) => {

        leaderboard.innerHTML +=

            createPlayerRow(

                entry.player,

                index + 1,

                entry.points

            );

    });
}


/* =====================================================
   11. PLAYER PROFILE
   ===================================================== */

function showPlayerProfile(playerName) {

    const player =
        players.find(

            p =>
                p.name.toLowerCase() ===
                playerName.toLowerCase()

        );


    if (!player) {

        console.error(
            "Player not found:",
            playerName
        );

        return;

    }


    /* Hide other pages */

    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("gamemodePage")
        .classList.add("hidden");


    document
        .getElementById("searchSection")
        .classList.add("hidden");


    /* Create profile section if it doesn't exist */

    let profile =
        document.getElementById(
            "playerProfile"
        );


    if (!profile) {

        profile =
            document.createElement("section");

        profile.id =
            "playerProfile";

        document
            .querySelector("main")
            .appendChild(profile);

    }


    profile.classList.remove("hidden");


    /* Overall */

    const overall =
        calculateOverall(player);


    const overallTier =
        getTier(overall);


    /* Gamemode rows */

    let modesHTML = "";


    for (
        const modeKey
        of Object.keys(gamemodes)
    ) {

        const mode =
            gamemodes[modeKey];


        const points =
            typeof player[modeKey] === "number"
                ? player[modeKey]
                : 0;


        const tier =
            getTier(points);


        modesHTML += `

            <div
                class="profile-mode"
                onclick="showGamemode('${modeKey}')"
                style="cursor: pointer;"
            >

                <div>

                    ${mode.icon}

                    ${escapeHTML(mode.name)}

                </div>


                <strong>

                    ${points.toLocaleString()}
                    pts

                </strong>


                <span
                    class="tier ${tier}"
                >

                    ${tier}

                </span>

            </div>

        `;

    }


    /* Create profile */

    profile.innerHTML = `

        <button
            class="back-button"
            onclick="showOverall()"
        >

            ← Back to Overall

        </button>


        <div class="profile-card">


            ${getHead(player.name)}


            <h2>

                ${escapeHTML(player.name)}

            </h2>


            <div class="profile-overall">


                <span>
                    Overall
                </span>


                <strong>

                    ${overall.toLocaleString()}
                    pts

                </strong>


                <div
                    class="tier ${overallTier}"
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


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });
}


/* =====================================================
   12. SEARCH PLAYER
   ===================================================== */

function searchPlayer() {

    const inputElement =
        document.getElementById(
            "searchInput"
        );


    if (!inputElement) {
        return;
    }


    const input =
        inputElement.value
            .toLowerCase()
            .trim();


    /* Empty search */

    if (!input) {

        showOverall();

        return;

    }


    /* Hide other pages */

    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("gamemodePage")
        .classList.add("hidden");


    const profile =
        document.getElementById(
            "playerProfile"
        );


    if (profile) {

        profile.classList.add("hidden");

    }


    document
        .getElementById("searchSection")
        .classList.remove("hidden");


    /* Find players */

    const foundPlayers =
        players.filter(player =>

            player.name
                .toLowerCase()
                .includes(input)

        );


    const results =
        document.getElementById(
            "searchResults"
        );


    results.innerHTML = "";


    /* No players */

    if (foundPlayers.length === 0) {

        results.innerHTML = `

            <div class="player">

                <div class="player-info">

                    <div class="player-name">

                        No players found.

                    </div>

                    <div class="player-rank">

                        Try another username.

                    </div>

                </div>

            </div>

        `;


        return;

    }


    /* Results */

    foundPlayers.forEach(player => {

        const points =
            calculateOverall(player);


        results.innerHTML +=

            createPlayerRow(

                player,

                "-",

                points

            );

    });

}


/* =====================================================
   13. SCROLL TO GAMEMODES
   ===================================================== */

function scrollToModes() {

    const modes =
        document.getElementById(
            "modesSection"
        );


    if (!modes) {
        return;
    }


    /* Make sure Overall page is visible */

    document
        .getElementById("overallSection")
        .classList.remove("hidden");


    modes.classList.remove("hidden");


    document
        .getElementById("gamemodePage")
        .classList.add("hidden");


    const profile =
        document.getElementById(
            "playerProfile"
        );


    if (profile) {

        profile.classList.add("hidden");

    }


    modes.scrollIntoView({

        behavior: "smooth"

    });

}


/* =====================================================
   14. INITIALIZE WEBSITE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderOverall();

        renderGamemodes();

    }
);
