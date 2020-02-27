let games = [
    {
        "src": "../images/chinaBomb_156_360.png",
        "alt": "a picture of a bomb with a chines flag painted on the side",
        "href": "trumpRun.html",
        "title": "Speedo Torpedo",
        "bio": [
            "Never planned on being president?",
            "Is Your life a joke?",
            "Wish you could outrun your trade deal with china?",
            "Now you can"
        ],
        "author": "",
        "authorImg": ""
    },
    {
        "src": "../images/queen/queen/queenSmack_156_231_alt.png",
        "alt": "a sprite sheet of queen elizabith hands alternating up and down",
        "href": "smackQueen.html",
        "title": "Fight Her Holiness",
        "bio": [
            "Being subject to the Queen gotcha down?",
            "Nows your chance to beat them taxes outta her ugly ass"
        ],
        "author": "",
        "authorImg": ""
    },
    {
        "src": "../images/legs/dildo_duckUnder_624_312.png",
        "alt": "a hand gripping a giant dildo",
        "href": "legGame.html",
        "title": "Dildo Hopper",
        "bio": [
            "Think your life sucks!?!?",
            "TRY BEING THIS GIRL!!!",
            "Life's a jungle out there. See how far you can navigate the busy streets of <bold>Your City</bold>.",
            "This game has been set up in a way to target major cities mayors and demographics. along with landmarks. Wider demographics, wider audience. One game for every major city in the world!! Global Domination.."
        ],
        "author": "",
        "authorImg": ""
    },
    // lets create the lofi and the punch alt and the legs, ya know for space
    {
        "src": "../lofi/images/lofi_fireLeft.png",
        "alt": "zoosooki riding on a train with kiko",
        "href": "../lofi/images/index-lofi.html",
        "title": "Lofi.Space.Ride",
        "bio": [
            "fps, background noise.",
            "space monster alien 5: part three",
            "cherrish the go"
        ],
        "author": "",
        "authorImg": ""
    },
    {
        "src": "../images/punch/trump_punch.png",
        "alt": "sprite sheet of trump punching",
        "href": "orgPunch.html",
        "title": "Punch the Prez",
        "bio": [
            "it kinda be like that",
            "Punch a Trump",
            "Commander and Chief Sux my d*k"
        ],
        "author": "Guy Ferrari",
        "authorImg": "../images/profile/guy-ferarri.jpeg"
    },
    {
        "src": "../images/legs/heels_shortSpring_156_312.png",
        "alt": "Quick Spring",
        "href": "legs-shortSprint.html",
        "title": "Quick.sprinG",
        "bio": [
            "i do not wish to comment for i know the meaning not..."
        ],
        "author": "Joi Doi",
        "authorImg": "../images/profile/joi-doi.jfif"
    },
    {
        "src": "../images/legs/heels_sprint_156_312.png",
        "alt": "girl in heels running in her underwear sprite sheet",
        "href": "/legs-spring.html",
        "title": "",
        "bio": [
            "i do not wish to comment for i know the meaning not..."
        ],
        "author": "Joi Doi",
        "authorImg": "../images/profile/joi-doi.jfif"
    },
    {
        "src": "../images/legs/justCurious_100_312.png",
        "alt": "just curious case of the legs",
        "href": "legs-justCurious.html",
        "title": "Booty Shake",
        "bio": [
            "i do not wish to comment for i know the meaning not..."
        ],
        "author": "Joi Doi",
        "authorImg": "../images/profile/joi-doi.jfif"
    },
    {        
        "src": "../images/legs/fastWalk_100_312.png",
        "alt": "legs from fast walk",
        "href": "legs-fastWalk.html",
        "title": "origional",
        "bio": [
            "i do not wish to comment for i know the meaning not..."
        ],
        "author": "Joi Doi",
        "authorImg": "../images/profile/joi-doi.jfif"
    }
];
var game_container = document.getElementById("game-container");
//create_game_containers();
createShowCase();


function createShowCase() {
    var game_string = "";
    for (var i = 0; i < games.length; i++) {
        console.log(games[i].title);
        game_string += '<div id=" '+i+' class=" '
            + 'col-xs-12 col-sm-4 col-md-4 " >';
            game_string += '<img src="'+ games[i].src 
            + '" alt="' + games[i].alt 
            + ' class="game-display" > ';

        game_string += '</div>'


    }
    game_container.innerHTML = game_string;
}


























function create_game_containers() {
    var game_string = "";
    for (var i = 0; i < games.length; i++) {
        game_string += '<a href="'
            + games[i].href
            + ' " class="col-xs-12 col-sm-6 col-md-4" '
            + 'id=" '
            + i
            + ' ">'
            + '<img src="'
            + games[i].src
            + '" alt="'
            + games[i].alt
            + '"><h3>'
            + games[i].title
            + '</h3>';
        for (var j = 0; j < games[i].bio.length; j++) {
            game_string += '<p>'
                + games[i].bio[j]
                + '</p>';
        }

        game_string += '</div></a>';

        game_container.innerHTML = game_string;
    }

}
