// ========================================
// ABYSSAL TIERS - SCRIPT
// ========================================


// ========================================
// GET TIER
// ========================================

function getTier(points) {

    points = Number(points) || 0;

    if (points >= 1000) return "HT1";
    if (points >= 900) return "LT1";

    if (points >= 800) return "HT2";
    if (points >= 700) return "LT2";

    if (points >= 600) return "HT3";
    if (points >= 500) return "LT3";

    if (points >= 400) return "HT4";
    if (points >= 300) return "LT4";

    return "HT5";
}


// ========================================
// MINECRAFT HEAD
// ========================================

function getHead(name) {

    return `https://mc-heads.net/avatar/${encodeURIComponent(name)}/44`;

}


// ========================================
// CALCULATE OVERALL
// ========================================

function calculateOverall(player) {

    let total = 0;
    let count = 0;

    Object.keys(gamemodes).forEach(modeKey => {

        const points = Number(player[modeKey]);

        if (!isNaN(points) && points > 0) {

            total += points;
            count++;

        }

    });

    if (count === 0) {
        return 0;
    }

    return Math.round(total / count);
}


// ========================================
// CREATE PLAYER ROW
// ========================================

function createPlayerRow(player, position, points) {

    const row = document.createElement("div");

    row.className = "leaderboard-row";

    const tier = getTier(points);

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
            ${Number(points).toLocaleString()}
        </div>

        <div class="player-tier tier-${tier.toLowerCase()}">
            ${tier}
        </div>

    `;

    row.addEventListener("click", () => {

        showPlayerProfile(player.name);

    });

    return row;
}


// ========================================
// SHOW OVERALL
// ========================================

function showOverall() {

    const overall = document.getElementById("overall");
    const gamemodesSection = document.getElementById("gamemodes");
    const gamemodePage = document.getElementById("gamemodePage");
    const playerProfile = document.getElementById("playerProfile");

    if (overall) {
        overall.style.display = "block";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "block";
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }

    renderOverall();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// RENDER OVERALL
// ========================================

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


// ========================================
// RENDER GAMEMODES
// ========================================

function renderGamemodes() {

    const grid =
        document.getElementById("gamemodeGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    Object.entries(gamemodes).forEach(
        ([key, mode]) => {

            const card =
                document.createElement("div");

            card.className = "gamemode-card";


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
                        ${mode.icon || ""}
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


            card.addEventListener(
                "click",
                () => {

                    showGamemode(key);

                }
            );


            grid.appendChild(card);

        }
    );
}


// ========================================
// SHOW GAMEMODE
// ========================================

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


    if (overall) {
        overall.style.display = "none";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }

    if (gamemodePage) {
        gamemodePage.style.display = "block";
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


// ========================================
// RENDER GAMEMODE LEADERBOARD
// ========================================

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


// ========================================
// PLAYER PROFILE
// ========================================

function showPlayerProfile(name) {

    const player =
        players.find(
            p => p.name === name
        );

    if (!player) {
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


    const profileName =
        document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = player.name;
    }


    const profileHead =
        document.getElementById("profileHead");

    if (profileHead) {
        profileHead.src = getHead(player.name);
        profileHead.alt = player.name;
    }


    const overallPoints =
        calculateOverall(player);

    const profilePoints =
        document.getElementById("profileOverallPoints");

    if (profilePoints) {
        profilePoints.textContent =
            overallPoints;
    }


    const profileTier =
        document.getElementById("profileOverallTier");

    if (profileTier) {
        profileTier.textContent =
            getTier(overallPoints);
    }


    const profileGamemodes =
        document.getElementById("profileGamemodes");

    if (!profileGamemodes) {
        return;
    }

    profileGamemodes.innerHTML = "";


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


            row.innerHTML = `

                <div class="profile-mode-name">

                    <span>
                        ${mode.icon || ""}
                    </span>

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


            row.addEventListener(
                "click",
                () => {

                    showGamemode(key);

                }
            );


            profileGamemodes.appendChild(row);

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// SHOW MAIN PAGE
// ========================================

function showMainPage(scrollTarget = null) {

    const overall =
        document.getElementById("overall");

    const gamemodesSection =
        document.getElementById("gamemodes");

    const gamemodePage =
        document.getElementById("gamemodePage");

    const playerProfile =
        document.getElementById("playerProfile");


    if (overall) {
        overall.style.display = "block";
    }

    if (gamemodesSection) {
        gamemodesSection.style.display = "block";
    }

    if (gamemodePage) {
        gamemodePage.style.display = "none";
    }

    if (playerProfile) {
        playerProfile.style.display = "none";
    }


    if (scrollTarget) {

        setTimeout(() => {

            const target =
                document.getElementById(scrollTarget);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
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


// ========================================
// NAVIGATION
// ========================================

function setupNavigation() {

    const overallLinks =
        document.querySelectorAll(
            'a[href="#overall"]'
        );


    overallLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMainPage("overall");

            }
        );

    });


    const gamemodeLinks =
        document.querySelectorAll(
            'a[href="#gamemodes"]'
        );


    gamemodeLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMainPage("gamemodes");

            }
        );

    });


    const backButtons =
        document.querySelectorAll(
            ".back-button, [data-back]"
        );


    backButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showMainPage();

            }
        );

    });
}


// ========================================
// START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderOverall();

        renderGamemodes();

        setupNavigation();

    }
);
