import hollowKnight from './/assets/img/hollow_knight.jpg';
import warcraft from './/assets/img/warcraft3.jpg';
import genshinImpact from './/assets/img/genshin_impact.jpg';
import terraria from './/assets/img/terraria.png';
import celeste from './/assets/img/celeste.png';
import helldivers2 from './/assets/img/helldivers2.jpg';
import itTakesTwo from './/assets/img/it_takes_two.jpg';
import lol from './/assets/img/league_of_legends.jpg';
import overcooked2 from './/assets/img/overcooked2.jpg';
import overwatch from './/assets/img/overwatch.jpg';
import phasmopobia from './/assets/img/phasmophobia.jpg';
import theWitcher from './/assets/img/the_witcher.webp';
import theWitcher2 from './/assets/img/the_witcher2.jpg';
import theWitcher3 from './/assets/img/the_witcher3.webp';
import stalkerSoC from './/assets/img/stalker_shadow_of_chernobyl.jpg';

const single = 'Singleplayer';
const multi = 'Multiplayer';
const coop = 'Cooperative';

const games = [
    {
        id: 0,
        title: 'Hollow Knight',
        src: hollowKnight,
        description: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom' +
            'of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs,' +
            'all in a classic, hand-drawn 2D style.',
        genres: 'Metroidvania, Platformer',
        type: single
    },
    {
        id: 1,
        title: 'Genshin Impact',
        src: genshinImpact,
        description: 'Explore a fantasy world called Teyvat, meet beautiful and breathtaking characters to travel with you' +
            'and discover more parts of the world overwhelming with new friends, treasures and stories!',
        genres: 'Action, Anime, Adventure, RPG, Gacha',
        type: coop
    },
    {
        id: 2,
        title: 'Warcraft 3',
        src: warcraft,
        description: 'A stunning revolutionary real-time strategy game that laid the foundation for Azeroth’s most epic stories. It is a really cool story. Command the Night Elves, Undead, Orcs, and Humans as alliances shift and armies clash in this timeless real-time strategy game.',
        genres: 'Real-time strategy',
        type: single
    },
    {
        id: 3,
        title: 'Terraria',
        src: terraria,
        description: 'Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. The world is your canvas and the ground itself is your paint.',
        genres: 'Sandbox, Action, Adventure, RPG',
        type: single
    },
    {
        id: 4,
        title: 'Celeste',
        src: celeste,
        description: 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain, in this super-tight platformer from the creators of TowerFall. Brave hundreds of hand-crafted challenges, uncover devious secrets, and piece together the mystery of the mountain.',
        genres: 'Platformer',
        type: single
    },
    {
        id: 5,
        title: 'The Witcher',
        src: theWitcher,
        description: 'Become The Witcher, Geralt of Rivia, a legendary monster slayer caught in a web of intrigue woven by forces vying for control of the world. Make difficult decisions and live with the consequences in a game that will immerse you in an extraordinary tale like no other.',
        genres: 'RPG, Fantasy',
        type: single
    },
    {
        id: 6,
        title: 'The Witcher 2',
        src: theWitcher2,
        description: 'A time of untold chaos has come. Mighty forces clash behind the scenes in a struggle for power and influence. The Northern Kingdoms mobilize for war. But armies on the march are not enough to stop a bloody conspiracy...',
        genres: 'RPG, Fantasy',
        type: single
    },
    {
        id: 7,
        title: 'The Witcher 3',
        src: theWitcher3,
        description: 'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
        genres: 'RPG, Fantasy',
        type: single
    },
    {
        id: 8,
        title: 'Helldivers 2',
        src: helldivers2,
        description: 'The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.',
        genres: 'Third-person Shooter, Action',
        type: coop
    },
    {
        id: 9,
        title: 'S.T.A.L.K.E.R.: Shadow of Chernobyl',
        src: stalkerSoC,
        description: 'S.T.A.L.K.E.R.: Shadow of Chernobyl tells a story about survival in the Zone – a very dangerous place, where you fear not only the radiation, anomalies and deadly creatures, but other S.T.A.L.K.E.R.s, who have their own goals and wishes.',
        genres: 'FPS, RPG',
        type: single
    },
    {
        id: 10,
        title: 'Overwatch',
        src: overwatch,
        description: 'Overwatch is a critically acclaimed, team-based shooter game set in an optimistic future with an evolving roster of heroes. Team up with friends and jump in today.',
        genres: 'FPS',
        type: multi
    },
    {
        id: 11,
        title: 'It Takes Two',
        src: itTakesTwo,
        description: 'Embark on the craziest journey of your life in It Takes Two. Invite a friend to join for free with Friend’s Pass and work together across a huge variety of gleefully disruptive gameplay challenges. Winner of GAME OF THE YEAR at the Game Awards 2021.',
        genres: 'Puzzle, 3D Platformer',
        type: coop
    },
    {
        id: 12,
        title: 'Phasmophobia',
        src: phasmopobia,
        description: 'Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.',
        genres: 'Horror, Detective',
        type: coop
    },
    {
        id: 13,
        title: 'League of Legends',
        src: lol,
        description: 'League of Legends is a team-based game with over 140 champions to make epic plays with.',
        genres: 'MOBA',
        type: multi
    },
    {
        id: 14,
        title: 'Overcooked 2',
        src: overcooked2,
        description: 'Overcooked returns with a brand-new helping of chaotic cooking action! Journey back to the Onion Kingdom and assemble your team of chefs in classic couch co-op or online play for up to four players. Hold onto your aprons… it’s time to save the world again!',
        genres: 'Cooking, Casual',
        type: coop
    },
]

export default games;