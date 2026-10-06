/* =====================================================
   ABYSSAL TIERS
   MAIN SCRIPT
===================================================== */


/* =====================================================
   GET TIER
===================================================== */

function getTier(points) {

    if (points >= 950) return "HT1";
    if (points >= 900) return "LT1";

    if (points >= 850) return "HT2";
    if (points >= 800) return "LT2";

    if (points >= 750) return "HT3";
    if (points >= 700) return "LT3";

    if (points >= 650) return "HT4";
    if (points >= 600) return "LT4";

    if (points >= 550) return "HT5";

    return "LT5";
}


/* =====================================================
   GET MINECRAFT HEAD
===================================================== */

function getHead(playerName) {

    return `
        <img
            class="head"
            src="https://mc-heads.net/avatar/${encodeURIComponent(playerName)}/44"
            alt="${playerName}"
        >
    `;
}


/* =====================================================
   CALCULATE OVERALL
===================================================== */

function calculateOverall(player) {

    let total = 0;
    let count = 0;

    Object.keys(gamemodes).forEach(function(mode) {

        if (typeof player[mode] === "number") {

            total += player[mode];

            count++;

        }

    });

    if (count === 0) {
        return 0;
    }

    return Math.round(total / count);
}


/* =====================================================
   CREATE PLAYER ROW
===================================================== */

function createPlayerRow(player, position, points) {

    const tier = getTier(points);

    const row = document.createElement("div");

    row.className = "player";

    row.style.cursor = "pointer";


    row.innerHTML = `

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

    `;


    /* CLICK PLAYER */

    row.addEventListener("click", function() {

        showPlayerProfile(player.name);

    });


    return row;
}


/* =====================================================
   SHOW OVERALL
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
        .getElementById("playerProfile")
        .classList.add("hidden");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   RENDER OVERALL
===================================================== */

function renderOverall() {

    const leaderboard =
        document.getElementById(
            "overallLeaderboard"
        );


    leaderboard.innerHTML = "";


    const sortedPlayers = players
        .map(function(player) {

            return {

                player: player,

                points:
                    calculateOverall(player)

            };

        })
        .sort(function(a, b) {

            return b.points - a.points;

        });


    sortedPlayers.forEach(function(entry, index) {

        const row = createPlayerRow(

            entry.player,

            index + 1,

            entry.points

        );


        leaderboard.appendChild(row);

    });


    document.getElementById(
        "overallPlayerCount"
    ).textContent =
        players.length + " players";

}


/* =====================================================
   RENDER GAMEMODES
===================================================== */

function renderGamemodes() {

    const grid =
        document.getElementById(
            "gamemodeGrid"
        );


    grid.innerHTML = "";


    Object.keys(gamemodes).forEach(function(modeKey) {

        const mode =
            gamemodes[modeKey];


        const card =
            document.createElement("div");


        card.className =
            "gamemode-card";


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


        /* IMPORTANT:
           CLICK PE GAMEMODE
        */

        card.addEventListener(
            "click",
            function() {

                showGamemode(modeKey);

            }
        );


        grid.appendChild(card);

    });

}


/* =====================================================
   SHOW GAMEMODE
===================================================== */

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];


    if (!mode) {

        console.error(
            "Gamemode not found:",
            modeKey
        );

        return;

    }


    /* Hide homepage */

    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("playerProfile")
        .classList.add("hidden");


    /* Show gamemode */

    document
        .getElementById("gamemodePage")
        .classList.remove("hidden");


    /* Title */

    document
        .getElementById("gamemodeTitle")
        .textContent =
        mode.name;


    /* Description */

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
   RENDER GAMEMODE
===================================================== */

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById(
            "gamemodeLeaderboard"
        );


    leaderboard.innerHTML = "";


    const sortedPlayers = players

        .map(function(player) {

            return {

                player: player,

                points:
                    typeof player[modeKey] === "number"
                        ? player[modeKey]
                        : 0

            };

        })

        .sort(function(a, b) {

            return b.points - a.points;

        });


    sortedPlayers.forEach(function(entry, index) {

        const row = createPlayerRow(

            entry.player,

            index + 1,

            entry.points

        );


        leaderboard.appendChild(row);

    });

}


/* =====================================================
   PLAYER PROFILE
===================================================== */

function showPlayerProfile(playerName) {

    const player = players.find(
        function(p) {

            return p.name === playerName;

        }
    );


    if (!player) {

        console.error(
            "Player not found:",
            playerName
        );

        return;

    }


    /* Hide everything else */

    document
        .getElementById("overallSection")
        .classList.add("hidden");


    document
        .getElementById("modesSection")
        .classList.add("hidden");


    document
        .getElementById("gamemodePage")
        .classList.add("hidden");


    /* Show profile */

    const profile =
        document.getElementById(
            "playerProfile"
        );


    profile.classList.remove("hidden");


    const overall =
        calculateOverall(player);


    const overallTier =
        getTier(overall);


    /* CREATE GAMEMODE LIST */

    let modesHTML = "";


    Object.keys(gamemodes).forEach(
        function(modeKey) {

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
                    data-mode="${modeKey}"
                >

                    <div>

                        ${mode.icon}

                        ${mode.name}

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
    );


    /* PROFILE HTML */

    profile.innerHTML = `

        <button
            id="profileBackButton"
            class="back-button"
        >

            ← Back to Overall

        </button>


        <div class="profile-card">

            ${getHead(player.name)}


            <h2>

                ${player.name}

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


    /* BACK BUTTON */

    document
        .getElementById(
            "profileBackButton"
        )
        .addEventListener(
            "click",
            showOverall
        );


    /* GAMEMODE BUTTONS IN PROFILE */

    document
        .querySelectorAll(
            ".profile-mode"
        )
        .forEach(function(element) {

            element.addEventListener(
                "click",
                function() {

                    const modeKey =
                        element.dataset.mode;


                    showGamemode(modeKey);

                }
            );

        });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   PAGE BUTTONS
===================================================== */

function setupNavigation() {


    /* OVERALL BUTTON */

    document
        .getElementById(
            "overallButton"
        )
        .addEventListener(
            "click",
            showOverall
        );


    /* GAMEMODES BUTTON */

    document
        .getElementById(
            "gamemodesButton"
        )
        .addEventListener(
            "click",
            function() {

                showOverall();


                setTimeout(function() {

                    document
                        .getElementById(
                            "modesSection"
                        )
                        .scrollIntoView({

                            behavior: "smooth"

                        });

                }, 100);

            }
        );


    /* BACK BUTTON */

    document
        .getElementById(
            "backButton"
        )
        .addEventListener(
            "click",
            function() {

                showOverall();


                setTimeout(function() {

                    document
                        .getElementById(
                            "modesSection"
                        )
                        .scrollIntoView({

                            behavior: "smooth"

                        });

                }, 100);

            }
        );

}


/* =====================================================
   START WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderOverall();

        renderGamemodes();

        setupNavigation();

    }
);
