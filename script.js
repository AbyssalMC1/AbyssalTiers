@@ -1,11 +1,11 @@
/* ============================================
   ABYSSAL TIERS
============================================ */
// ===============================
// ABYSSAL TIERS - SCRIPT
// ===============================


/* ============================================
   GET TIER
============================================ */
// ===============================
// TIER SYSTEM
// ===============================

function getTier(points) {

@@ -27,716 +27,710 @@ function getTier(points) {
}


/* ============================================
   MINECRAFT HEAD
============================================ */
// ===============================
// MINECRAFT HEAD
// ===============================

function getHead(name) {

    return `
        <img
            class="head"
            src="https://mc-heads.net/avatar/${encodeURIComponent(name)}/44"
            alt="${name}"
        >
    `;

    return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/44`;
}


/* ============================================
   OVERALL POINTS
============================================ */
// ===============================
// CALCULATE OVERALL
// ===============================

function calculateOverall(player) {

    let total = 0;
    let count = 0;

    let amount = 0;


    Object.keys(gamemodes).forEach(function(mode) {

        if (typeof player[mode] === "number") {

            total += player[mode];
    Object.keys(gamemodes).forEach(modeKey => {

            amount++;
        const points = Number(player[modeKey]);

        if (!isNaN(points)) {
            total += points;
            count++;
        }

    });


    if (amount === 0) {

    if (count === 0) {
        return 0;

    }


    return Math.round(total / amount);

    return Math.round(total / count);
}


/* ============================================
   CREATE PLAYER
============================================ */

function createPlayerRow(
    player,
    position,
    points
) {
// ===============================
// CREATE PLAYER ROW
// ===============================

    const row =
        document.createElement("div");
function createPlayerRow(player, position, points) {

    const tier = getTier(points);

    const tier =
        getTier(points);


    row.className =
        "player";
    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `

        <div class="position">
            #${position}
        <div class="player-position">
            ${position}
        </div>

        ${getHead(player.name)}

        <div class="player-info">

            <img
                class="player-head"
                src="${getHead(player.name)}"
                alt="${player.name}"
            >

            <div class="player-name">
                ${player.name}
            </div>

            <div class="player-rank">
                ${tier}
            </div>

        </div>

        <div class="points">
            ${points.toLocaleString()} pts
        <div class="player-points">
            ${points}
        </div>

        <div class="tier ${tier}">
        <div class="player-tier tier-${tier.toLowerCase()}">
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

    row.addEventListener("click", () => {
        showPlayerProfile(player);
    });

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
// ===============================
// RENDER OVERALL
// ===============================

function renderOverall() {

    const leaderboard =
        document.getElementById(
            "overallLeaderboard"
        );

        document.getElementById("overallLeaderboard");

    leaderboard.innerHTML = "";


    const sorted =
        players
            .map(function(player) {
    const playerCount =
        document.getElementById("overallPlayerCount");

                return {

                    player: player,

                    points:
                        calculateOverall(player)
    if (!leaderboard) {
        return;
    }

                };
    leaderboard.innerHTML = "";

            })
    const rankedPlayers = players
        .map(player => {

            return {
                player: player,
                points: calculateOverall(player)
            };

            .sort(function(a, b) {
        })
        .sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            });


    sorted.forEach(
        function(entry, index) {

            const row =
                createPlayerRow(

                    entry.player,

                    index + 1,
            return a.player.name.localeCompare(b.player.name);

                    entry.points
        });

                );

    if (playerCount) {
        playerCount.textContent =
            `${players.length} players`;
    }

            leaderboard.appendChild(row);

        }
    );
    rankedPlayers.forEach((entry, index) => {

        const row = createPlayerRow(
            entry.player,
            index + 1,
            entry.points
        );

    document
        .getElementById(
            "overallPlayerCount"
        )
        .textContent =
        players.length + " players";
        leaderboard.appendChild(row);

    });
}


/* ============================================
   RENDER GAMEMODES
============================================ */
// ===============================
// RENDER GAMEMODES
// ===============================

function renderGamemodes() {

    const grid =
        document.getElementById(
            "gamemodeGrid"
        );
        document.getElementById("gamemodeGrid");

    if (!grid) {
        return;
    }

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

    Object.entries(gamemodes).forEach(([key, mode]) => {

            card.innerHTML = `
        const card =
            document.createElement("div");

                <div>
        card.className = "gamemode-card";

                    <div class="mode-icon">

                        <img
                            src="${mode.icon}"
                            alt="${mode.name}"
                        >
        /*
         * Dacă icon-ul este o imagine,
         * o afișăm ca imagine.
         *
         * Dacă este emoji/text,
         * îl afișăm ca text.
         */

                    </div>
        let iconHTML = "";

                    <div class="mode-name">
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

                        ${mode.name}
            iconHTML = `
                <div class="mode-icon">
                    <img
                        src="${mode.icon}"
                        alt="${mode.name}"
                    >
                </div>
            `;

                    </div>
        } else {

            iconHTML = `
                <div class="mode-icon">
                    <span>${mode.icon || ""}</span>
                </div>
            `;

        }

                <div class="mode-players">

                    ${players.length}
                    players
        card.innerHTML = `

                </div>
            ${iconHTML}

            `;
            <div class="mode-name">
                ${mode.name}
            </div>

            <div class="mode-players">
                ${players.length} players
            </div>

            /* CLICK GAMEMODE */
        `;

            card.addEventListener(
                "click",
                function() {

                    showGamemode(
                        modeKey
                    );
        card.addEventListener("click", () => {

                }
            );
            showGamemode(key);

        });

            grid.appendChild(card);

        });
        grid.appendChild(card);

    });
}


/* ============================================
   SHOW GAMEMODE
============================================ */
// ===============================
// SHOW GAMEMODE
// ===============================

function showGamemode(modeKey) {

    const mode =
        gamemodes[modeKey];

    const mode = gamemodes[modeKey];

    if (!mode) {

        return;

    }


    document
        .getElementById(
            "overallSection"
        )
        .classList.add("hidden");
    const overall =
        document.getElementById("overall");

    const gamemodesSection =
        document.getElementById("gamemodes");

    document
        .getElementById(
            "modesSection"
        )
        .classList.add("hidden");
    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");

    document
        .getElementById(
            "playerProfile"
        )
        .classList.add("hidden");

    // Ascunde pagina principală
    if (overall) {
        overall.style.display = "none";
    }

    document
        .getElementById(
            "gamemodePage"
        )
        .classList.remove("hidden");
    if (gamemodesSection) {
        gamemodesSection.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }

    document
        .getElementById(
            "gamemodeTitle"
        )
        .textContent =
        mode.name;

    // Arată pagina gamemode-ului
    if (gamemodePage) {
        gamemodePage.style.display = "block";
    }

    document
        .getElementById(
            "gamemodeDescription"
        )
        .textContent =
        mode.description;

    // Titlu
    const title =
        document.getElementById("gamemodeTitle");

    renderGamemode(
        modeKey
    );
    if (title) {
        title.textContent = mode.name;
    }


    window.scrollTo({
    // Descriere
    const description =
        document.getElementById("gamemodeDescription");

        top: 0,
    if (description) {
        description.textContent =
            mode.description || "";
    }

        behavior: "smooth"

    });
    // Leaderboard
    renderGamemode(modeKey);


    // Scroll sus
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ============================================
   RENDER GAMEMODE
============================================ */
// ===============================
// RENDER GAMEMODE LEADERBOARD
// ===============================

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById(
            "gamemodeLeaderboard"
        );
        document.getElementById("gamemodeLeaderboard");

    if (!leaderboard) {
        return;
    }

    leaderboard.innerHTML = "";


    const sorted =
        players
            .map(function(player) {

                return {
    const rankedPlayers = players
        .map(player => {

                    player: player,

                    points:
                        player[modeKey] || 0

                };

            })
            const points =
                Number(player[modeKey]) || 0;

            return {
                player: player,
                points: points
            };

            .sort(function(a, b) {
        })
        .sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            });
            return a.player.name.localeCompare(b.player.name);

        });

    sorted.forEach(
        function(entry, index) {

            const row =
                createPlayerRow(
    rankedPlayers.forEach((entry, index) => {

                    entry.player,
        const row = createPlayerRow(
            entry.player,
            index + 1,
            entry.points
        );

                    index + 1,
        leaderboard.appendChild(row);

                    entry.points
    });
}

                );

// ===============================
// PLAYER PROFILE
// ===============================

            leaderboard.appendChild(row);
function showPlayerProfile(player) {

        }
    );
    const overall =
        document.getElementById("overall");

}
    const gamemodesSection =
        document.getElementById("gamemodes");

    const gamemodePage =
        document.getElementById("gamemodePage");

/* ============================================
   PLAYER PROFILE
============================================ */
    const playerProfile =
        document.getElementById("playerProfile");

function showPlayerProfile(name) {

    const player =
        players.find(
            function(p) {
    if (overall) {
        overall.style.display = "none";
    }

                return p.name === name;
    if (gamemodesSection) {
        gamemodesSection.style.display = "none";
    }

            }
        );
    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "block";
    }

    if (!player) {

        return;
    // Numele playerului
    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = player.name;
    }


    document
        .getElementById(
            "overallSection"
        )
        .classList.add("hidden");
    // Head
    const profileHead =
        document.getElementById("profileHead");

    if (profileHead) {
        profileHead.src = getHead(player.name);
        profileHead.alt = player.name;
    }

    document
        .getElementById(
            "modesSection"
        )
        .classList.add("hidden");

    // Overall points
    const profilePoints =
        document.getElementById("profileOverallPoints");

    document
        .getElementById(
            "gamemodePage"
        )
        .classList.add("hidden");
    if (profilePoints) {

        profilePoints.textContent =
            calculateOverall(player);

    const profile =
        document.getElementById(
            "playerProfile"
        );
    }


    profile.classList.remove(
        "hidden"
    );
    // Overall tier
    const profileTier =
        document.getElementById("profileOverallTier");

    if (profileTier) {

    const overall =
        calculateOverall(player);

        profileTier.textContent =
            getTier(calculateOverall(player));

    const tier =
        getTier(overall);
    }


    let modes = "";
    // Gamemode list
    const profileModes =
        document.getElementById("profileGamemodes");

    if (!profileModes) {
        return;
    }

    Object.keys(gamemodes)
        .forEach(function(modeKey) {

    profileModes.innerHTML = "";

            const mode =
                gamemodes[modeKey];

    Object.entries(gamemodes).forEach(
        ([key, mode]) => {

            const points =
                player[modeKey] || 0;

                Number(player[key]) || 0;

            const modeTier =
            const tier =
                getTier(points);


            modes += `
            const row =
                document.createElement("div");

            row.className =
                "profile-mode-row";

                <div
                    class="profile-mode"
                    data-mode="${modeKey}"
                >

                    <div class="profile-mode-name">
            let iconHTML = "";

                        <img
                            class="profile-mode-icon"
                            src="${mode.icon}"
                            alt="${mode.name}"
                        >

                        <span>
                            ${mode.name}
                        </span>
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

                    </div>
                iconHTML = `
                    <img
                        class="profile-mode-icon"
                        src="${mode.icon}"
                        alt="${mode.name}"
                    >
                `;

            } else {

                    <strong>
                iconHTML = `
                    <span class="profile-mode-icon-text">
                        ${mode.icon || ""}
                    </span>
                `;

                        ${points}
                        pts
            }

                    </strong>

            row.innerHTML = `

                    <span
                        class="tier ${modeTier}"
                    >
                <div class="profile-mode-name">

                        ${modeTier}
                    ${iconHTML}

                    <span>
                        ${mode.name}
                    </span>

                </div>

            `;
                <div class="profile-mode-points">
                    ${points}
                </div>

        });
                <div class="profile-mode-tier tier-${tier.toLowerCase()}">
                    ${tier}
                </div>

            `;

    profile.innerHTML = `

        <a
            href="#overallSection"
            class="back-button"
        >
            profileModes.appendChild(row);

            ← Back to Overall
        }
    );

        </a>

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

        <div class="profile-card">

            ${getHead(player.name)}
// ===============================
// SHOW MAIN PAGE
// ===============================

function showMainPage(scrollTarget = null) {

            <h2>
    const overall =
        document.getElementById("overall");

                ${player.name}
    const gamemodesSection =
        document.getElementById("gamemodes");

            </h2>
    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");

            <div class="profile-overall">

                <span>
                    Overall
                </span>
    // Arată pagina principală
    if (overall) {
        overall.style.display = "block";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "block";
    }

                <strong>

                    ${overall}
                    pts
    // Ascunde paginile secundare
    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

                </strong>
    if (playerProfile) {
        playerProfile.style.display = "none";
    }


                <div
                    class="tier ${tier}"
                >
    // Scroll
    if (scrollTarget) {

                    ${tier}
        setTimeout(() => {

                </div>
            const target =
                document.getElementById(scrollTarget);

            </div>
            if (target) {

        </div>
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        <div class="section-title">
        }, 50);

            <div>
    } else {

                <span class="section-small">
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

                    RANKINGS
    }
}

                </span>

// ===============================
// NAVIGATION
// ===============================

                <h2>
function setupNavigation() {

                    Gamemodes
    // ===========================
    // OVERALL
    // ===========================

                </h2>
    const overallLinks =
        document.querySelectorAll(
            'a[href="#overall"]'
        );

            </div>

        </div>
    overallLinks.forEach(link => {

        link.addEventListener("click", (event) => {

        <div class="profile-modes">
            event.preventDefault();

            ${modes}
            showMainPage("overall");

        </div>
        });

    `;
    });


    /* CLICK GAMEMODES FROM PROFILE */
    // ===========================
    // GAMEMODES
    // ===========================

    profile
        .querySelectorAll(
            ".profile-mode"
        )
        .forEach(function(element) {
    const gamemodesLinks =
        document.querySelectorAll(
            'a[href="#gamemodes"]'
        );


            element.addEventListener(
                "click",
                function() {
    gamemodesLinks.forEach(link => {

                    showGamemode(
                        element.dataset.mode
                    );
        link.addEventListener("click", (event) => {

                }
            );
            event.preventDefault();

            showMainPage("gamemodes");

        });

    });


    window.scrollTo({
    // ===========================
    // BACK BUTTONS
    // ===========================

        top: 0,
    const backButtons =
        document.querySelectorAll(
            ".back-button, [data-back]"
        );

        behavior: "smooth"

    backButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            showMainPage();

        });

    });

}


/* ============================================
   START
============================================ */
// ===============================
// START WEBSITE
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {
    () => {

        renderOverall();

        renderGamemodes();

        setupNavigation();

    }
);
