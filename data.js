const gamemodes = {

    sword: {
        name: "Sword",
        icon: "⚔",
        description: "Traditional sword PvP."
    },

    axe: {
        name: "Axe",
        icon: "🪓",
        description: "Axe PvP rankings."
    },

    mace: {
        name: "Mace",
        icon: "✦",
        description: "Mace PvP rankings."
    },

    uhc: {
        name: "UHC",
        icon: "❤",
        description: "Ultra Hardcore PvP."
    },

    diapot: {
        name: "DiaPot",
        icon: "◆",
        description: "Diamond potion PvP."
    },

    nethpot: {
        name: "NetherPot",
        icon: "♨",
        description: "Netherite potion PvP."
    },

    smp: {
        name: "SMP",
        icon: "S",
        description: "SMP PvP rankings."
    },

    diasmp: {
        name: "DiaSMP",
        icon: "D",
        description: "Diamond SMP PvP."
    },

    shieldlessuhc: {
        name: "Shieldless UHC",
        icon: "◇",
        description: "UHC without shields."
    },

    bridge: {
        name: "Bridge",
        icon: "B",
        description: "Bridge PvP rankings."
    },

    elymace: {
        name: "ElyMace",
        icon: "E",
        description: "Elytra mace combat."
    },

    elyspear: {
        name: "ElySpear",
        icon: "E",
        description: "Elytra spear combat."
    },

    spearmace: {
        name: "SpearMace",
        icon: "M",
        description: "Spear and mace combat."
    },

    creeperpvp: {
        name: "Creeper PvP",
        icon: "C",
        description: "Creeper based PvP."
    },

    kappapvp: {
        name: "Kappa PvP",
        icon: "K",
        description: "Kappa PvP."
    },

    tridentmace: {
        name: "TridentMace",
        icon: "T",
        description: "Trident and mace combat."
    },

    tridentspear: {
        name: "TridentSpear",
        icon: "T",
        description: "Trident and spear combat."
    },

    fireballfight: {
        name: "Fireball Fight",
        icon: "F",
        description: "Fireball PvP."
    },

    fireballmace: {
        name: "Fireball Mace",
        icon: "F",
        description: "Fireball and mace combat."
    },

    crystal: {
        name: "Crystal",
        icon: "◇",
        description: "End Crystal PvP."
    },

    cartspleef: {
        name: "Cart Spleef",
        icon: "C",
        description: "Cart Spleef rankings."
    },

    pearlfight: {
        name: "Pearl Fight",
        icon: "P",
        description: "Ender Pearl PvP."
    }

};


/*
=================================================
PLAYER DATA
=================================================

Pentru fiecare player poți pune punctele
lui în fiecare gamemode.

EXEMPLU:

Sword: 1000
Axe: 850

Overall-ul este calculat automat.

=================================================
*/


const players = [

    {
        name: "AbyssalMC",

        sword: 1000,
        axe: 950,
        mace: 900,
        uhc: 850,
        diapot: 900,
        nethpot: 950,
        smp: 800,
        diasmp: 850,
        shieldlessuhc: 800,
        bridge: 750,
        elymace: 700,
        elyspear: 700,
        spearmace: 750,
        creeperpvp: 800,
        kappapvp: 700,
        tridentmace: 750,
        tridentspear: 700,
        fireballfight: 650,
        fireballmace: 700,
        crystal: 1000,
        cartspleef: 600,
        pearlfight: 850
    },


    {
        name: "PlayerTwo",

        sword: 900,
        axe: 850,
        mace: 800,
        uhc: 900,
        diapot: 850,
        nethpot: 800,
        smp: 850,
        diasmp: 750,
        shieldlessuhc: 800,
        bridge: 900,
        elymace: 650,
        elyspear: 600,
        spearmace: 700,
        creeperpvp: 750,
        kappapvp: 800,
        tridentmace: 700,
        tridentspear: 750,
        fireballfight: 700,
        fireballmace: 650,
        crystal: 900,
        cartspleef: 800,
        pearlfight: 750
    },


    {
        name: "PlayerThree",

        sword: 800,
        axe: 750,
        mace: 850,
        uhc: 800,
        diapot: 700,
        nethpot: 750,
        smp: 900,
        diasmp: 850,
        shieldlessuhc: 700,
        bridge: 750,
        elymace: 800,
        elyspear: 750,
        spearmace: 800,
        creeperpvp: 650,
        kappapvp: 700,
        tridentmace: 850,
        tridentspear: 800,
        fireballfight: 750,
        fireballmace: 800,
        crystal: 750,
        cartspleef: 850,
        pearlfight: 800
    },


    {
        name: "PlayerFour",

        sword: 700,
        axe: 650,
        mace: 700,
        uhc: 750,
        diapot: 650,
        nethpot: 700,
        smp: 750,
        diasmp: 700,
        shieldlessuhc: 650,
        bridge: 800,
        elymace: 600,
        elyspear: 650,
        spearmace: 700,
        creeperpvp: 700,
        kappapvp: 650,
        tridentmace: 650,
        tridentspear: 700,
        fireballfight: 750,
        fireballmace: 700,
        crystal: 650,
        cartspleef: 700,
        pearlfight: 650
    }

];
