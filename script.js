/* ============================================
   ABYSSAL TIERS
============================================ */


/* ============================================
   GET TIER
============================================ */

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


/* ============================================
   MINECRAFT HEAD
============================================ */

function getHead(name) {

    return `
        <img
            class="head"
            src="https://mc-heads.net/avatar/${encodeURIComponent(name)}/44"
            alt="${name}"
        >
    `;

}


/* ============================================
   OVERALL POINTS
============================================ */

function calculateOverall(player) {

    let total = 0;

    let amount = 0;


    Object.keys(gamemodes).forEach(function(mode) {

        if (typeof player[mode] === "number") {

            total += player[mode];

            amount++;

        }

    });


    if (amount === 0) {

        return 0;

    }


    return Math.round(total / amount);

}


/* ============================================
   CREATE PLAYER
============================================ */

function createPlayerRow(
    player,
    position,
    points
) {

    const row =
        document.createElement("div");


    const tier =
        getTier(points);


    row.className =
        "player";


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
            ${points.toLocaleString()} pts
        </div>

        <div class="tier ${tier}">
            ${tier}
        </div>

    `;


    /* CLICK PLAYER */

    row.addEventListener(
        "click",
        function() {

            showPlayerProfile(
                player.name
            );

        }
    );


    return row;

}


/* ============================================
   SHOW OVERALL
============================================ */

function showOverall() {

    document
        .getElementById(
            "overallSection"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "modesSection"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "gamemodePage"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "playerProfile"
        )
        .classList.add("hidden");

}


/* ============================================
   RENDER OVERALL
============================================ */

function renderOverall() {

    const leaderboard =
        document.getElementById(
            "overallLeaderboard"
        );


    leaderboard.innerHTML = "";


    const sorted =
        players
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


    sorted.forEach(
        function(entry, index) {

            const row =
                createPlayerRow(

                    entry.player,

                    index + 1,

                    entry.points

                );


            leaderboard.appendChild(row);

        }
    );


    document
        .getElementById(
            "overallPlayerCount"
        )
        .textContent =
        players.length + " players";

}


/* ============================================
   RENDER GAMEMODES
============================================ */

function renderGamemodes() {

    const grid =
        document.getElementById(
            "gamemodeGrid"
        );


    grid.innerHTML = "";


    Object.keys(gamemodes)
        .forEach(function(modeKey) {


            const mode =
                gamemodes[modeKey];


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "gamemode-card";


            card.innerHTML = `

                <div>

                    <div class="mode-icon">

                        <img
                            src="${mode.icon}"
                            alt="${mode.name}"
                        >

                    </div>

                    <div class="mode-name">

                        ${mode.name}

                    </div>

                </div>


                <div class="mode-players">

                    ${players.length}
                    players

                </div>

            `;


            /* CLICK GAMEMODE */

            card.addEventListener(
                "click",
                function() {

                    showGamemode(
                        modeKey
                    );

                }
            );


            grid.appendChild(card);

        });

}


/* ============================================
   SHOW GAMEMODE
============================================ */

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];


    if (!mode) {

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
            "playerProfile"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "gamemodePage"
        )
        .classList.remove("hidden");


    document
        .getElementById(
            "gamemodeTitle"
        )
        .textContent =
        mode.name;


    document
        .getElementById(
            "gamemodeDescription"
        )
        .textContent =
        mode.description;


    renderGamemode(
        modeKey
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ============================================
   RENDER GAMEMODE
============================================ */

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById(
            "gamemodeLeaderboard"
        );


    leaderboard.innerHTML = "";


    const sorted =
        players
            .map(function(player) {

                return {

                    player: player,

                    points:
                        player[modeKey] || 0

                };

            })


            .sort(function(a, b) {

                return b.points - a.points;

            });


    sorted.forEach(
        function(entry, index) {

            const row =
                createPlayerRow(

                    entry.player,

                    index + 1,

                    entry.points

                );


            leaderboard.appendChild(row);

        }
    );

}


/* ============================================
   PLAYER PROFILE
============================================ */

function showPlayerProfile(name) {

    const player =
        players.find(
            function(p) {

                return p.name === name;

            }
        );


    if (!player) {

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


    const profile =
        document.getElementById(
            "playerProfile"
        );


    profile.classList.remove(
        "hidden"
    );


    const overall =
        calculateOverall(player);


    const tier =
        getTier(overall);


    let modes = "";


    Object.keys(gamemodes)
        .forEach(function(modeKey) {


            const mode =
                gamemodes[modeKey];


            const points =
                player[modeKey] || 0;


            const modeTier =
                getTier(points);


            modes += `

                <div
                    class="profile-mode"
                    data-mode="${modeKey}"
                >

                    <div class="profile-mode-name">

                        <img
                            class="profile-mode-icon"
                            src="${mode.icon}"
                            alt="${mode.name}"
                        >

                        <span>
                            ${mode.name}
                        </span>

                    </div>


                    <strong>

                        ${points}
                        pts

                    </strong>


                    <span
                        class="tier ${modeTier}"
                    >

                        ${modeTier}

                    </span>

                </div>

            `;

        });


    profile.innerHTML = `

        <a
            href="#overallSection"
            class="back-button"
        >

            ← Back to Overall

        </a>


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

                    ${overall}
                    pts

                </strong>


                <div
                    class="tier ${tier}"
                >

                    ${tier}

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

            ${modes}

        </div>

    `;


    /* CLICK GAMEMODES FROM PROFILE */

    profile
        .querySelectorAll(
            ".profile-mode"
        )
        .forEach(function(element) {


            element.addEventListener(
                "click",
                function() {

                    showGamemode(
                        element.dataset.mode
                    );

                }
            );


        });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ============================================
   START
============================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderOverall();

        renderGamemodes();

    }
);
