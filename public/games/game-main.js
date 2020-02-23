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
        ]
    },
    {
        "src": "../images/queen/queen/queenSmack_156_231_alt.png",
        "alt": "a sprite sheet of queen elizabith hands alternating up and down",
        "href": "smackQueen.html",
        "title": "Fight Her Holiness",
        "bio": [
            "Being subject to the Queen gotcha down?",
            "Nows your chance to beat them taxes outta her ugly ass"         
        ]
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
        ]
    },
    {
        "src": "",
        "alt": "",
        "href": "",
        "title": "",
        "bio": [
            
        ]
    }
];
var game_container = document.getElementById("game-container");
var game_string = "";
set_game_objects();

function set_game_objects(){
    for(var i = 0; i < games.length; i++){
        game_string += '<a href=">'
            + games[i].href 
            + '<div class="col-xs-12 col-sm-6 col-md-4" id="game-object"><img src="'
            + games[i].src
            + '" alt="'
            + games[i].alt 
            + '"><h3>'
            + games[i].title 
            + '</h3>';
    
            console.log(games[i].bio.length);
        for(var j = 0; j < games[i].bio.length; j++){
            game_string += '<p>'
                + games[i].bio[j]
                +'</p>';
        }
    
        game_string += '</div></a>';
    
    }
    
    game_container.innerHTML = game_string;
    console.log(game_string); 
}