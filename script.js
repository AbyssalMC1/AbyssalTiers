// ===============================
// ABYSSAL TIERS - SCRIPT
// ===============================


// ===============================
// TIER SYSTEM
// ===============================

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


// ===============================
// MINECRAFT HEAD
// ===============================

function getHead(name) {
    return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/44`;
}


// ===============================
// CALCULATE OVERALL
// ===============================

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


// ===============================
// CREATE PLAYER ROW
// ===============================

function createPlayerRow(player, position, points) {

    const tier = getTier(points);

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    row.innerHTML = `
        <div class="player-position">
            ${position}
        </div>

        <div class="player-info">

            <img
                class="player-head"
                src="${getHead(player.name)}"
                alt="${player.name}"
            >

            <div class="player-name">
                ${player.name}
            </div>

        </div>

        <div class="player-points">
            ${points}
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


// ===============================
// RENDER OVERALL
// ===============================

function renderOverall() {

    const leaderboard =
        document.getElementById("overallLeaderboard");

    const playerCount =
        document.getElementById("overallPlayerCount");

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

            return a.player.name.localeCompare(b.player.name);

        });


    if (playerCount) {
        playerCount.textContent =
            `${players.length} players`;
    }


    rankedPlayers.forEach((entry, index) => {

        const row = createPlayerRow(
            entry.player,
            index + 1,
            entry.points
        );

        leaderboard.appendChild(row);

    });
}


// ===============================
// RENDER GAMEMODES
// ===============================

function renderGamemodes() {

    const grid =
        document.getElementById("gamemodeGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    Object.entries(gamemodes).forEach(([key, mode]) => {

        const card =
            document.createElement("div");

        card.className = "gamemode-card";


        /*
         * Dacă icon-ul este o imagine,
         * o afișăm ca imagine.
         *
         * Dacă este emoji/text,
         * îl afișăm ca text.
         */

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

            showGamemode(key);

        });


        grid.appendChild(card);

    });
}


// ===============================
// SHOW GAMEMODE
// ===============================

function showGamemode(modeKey) {

    const mode = gamemodes[modeKey];

    if (!mode) {
        return;
    }


    const overall =
        document.getElementById("overall");

    const gamemodesSection =
        document.getElementById("gamemodes");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");


    // Ascunde pagina principală
    if (overall) {
        overall.style.display = "none";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }


    // Arată pagina gamemode-ului
    if (gamemodePage) {
        gamemodePage.style.display = "block";
    }


    // Titlu
    const title =
        document.getElementById("gamemodeTitle");

    if (title) {
        title.textContent = mode.name;
    }


    // Descriere
    const description =
        document.getElementById("gamemodeDescription");

    if (description) {
        description.textContent =
            mode.description || "";
    }


    // Leaderboard
    renderGamemode(modeKey);


    // Scroll sus
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// RENDER GAMEMODE LEADERBOARD
// ===============================

function renderGamemode(modeKey) {

    const leaderboard =
        document.getElementById("gamemodeLeaderboard");

    if (!leaderboard) {
        return;
    }

    leaderboard.innerHTML = "";


    const rankedPlayers = players
        .map(player => {

            const points =
                Number(player[modeKey]) || 0;

            return {
                player: player,
                points: points
            };

        })
        .sort((a, b) => {

            if (b.points !== a.points) {
                return b.points - a.points;
            }

            return a.player.name.localeCompare(b.player.name);

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


// ===============================
// PLAYER PROFILE
// ===============================

function showPlayerProfile(player) {

    const overall =
        document.getElementById("overall");

    const gamemodesSection =
        document.getElementById("gamemodes");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "none";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "none";
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "block";
    }


    // Numele playerului
    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = player.name;
    }


    // Head
    const profileHead =
        document.getElementById("profileHead");

    if (profileHead) {
        profileHead.src = getHead(player.name);
        profileHead.alt = player.name;
    }


    // Overall points
    const profilePoints =
        document.getElementById("profileOverallPoints");

    if (profilePoints) {

        profilePoints.textContent =
            calculateOverall(player);

    }


    // Overall tier
    const profileTier =
        document.getElementById("profileOverallTier");

    if (profileTier) {

        profileTier.textContent =
            getTier(calculateOverall(player));

    }


    // Gamemode list
    const profileModes =
        document.getElementById("profileGamemodes");

    if (!profileModes) {
        return;
    }


    profileModes.innerHTML = "";


    Object.entries(gamemodes).forEach(
        ([key, mode]) => {

            const points =
                Number(player[key]) || 0;

            const tier =
                getTier(points);


            const row =
                document.createElement("div");

            row.className =
                "profile-mode-row";


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


            row.innerHTML = `

                <div class="profile-mode-name">

                    ${iconHTML}

                    <span>
                        ${mode.name}
                    </span>

                </div>

                <div class="profile-mode-points">
                    ${points}
                </div>

                <div class="profile-mode-tier tier-${tier.toLowerCase()}">
                    ${tier}
                </div>

            `;


            profileModes.appendChild(row);

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ===============================
// SHOW MAIN PAGE
// ===============================

function showMainPage(scrollTarget = null) {

    const overall =
        document.getElementById("overall");

    const gamemodesSection =
        document.getElementById("gamemodes");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");


    // Arată pagina principală
    if (overall) {
        overall.style.display = "block";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "block";
    }


    // Ascunde paginile secundare
    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }


    // Scroll
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


// ===============================
// NAVIGATION
// ===============================

function setupNavigation() {

    // ===========================
    // OVERALL
    // ===========================

    const overallLinks =
        document.querySelectorAll(
            'a[href="#overall"]'
        );


    overallLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            showMainPage("overall");

        });

    });


    // ===========================
    // GAMEMODES
    // ===========================

    const gamemodesLinks =
        document.querySelectorAll(
            'a[href="#gamemodes"]'
        );


    gamemodesLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            showMainPage("gamemodes");

        });

    });


    // ===========================
    // BACK BUTTONS
    // ===========================

    const backButtons =
        document.querySelectorAll(
            ".back-button, [data-back]"
        );


    backButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            showMainPage();

        });

    });

}


// ===============================
// START WEBSITE
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderOverall();

        renderGamemodes();

        setupNavigation();

    }
);
