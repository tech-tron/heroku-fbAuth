console.log("game is here im here");
var articles = [
    {
        "title": "man cannot live by coffee alone",
        "href": "",
        "src": "images/girl-bites-lip.jpg",
        "alt": "blonde girl bites lip seductivly",
        "P": [
            ""
        ]
    },{
        "title":"a Time Machine does not make you God",
        "href": "time-machine-and-god.html",
        "src": "images/time-travel.jpg",
        "alt": "picture of the milkyway galaxy",
        
        "p" : [
            "if you had a time machine could you go back before god",
            "even a time machine can't save you from mortality",
            "earth made idol, turns to rust?"
        ]

    },
    {
        "title": "finding Her place in the World",
        "href": "meghen-worldly-kingdom.html",
        "src": "images/meghan-markle-and-prince-harry.jpg",
        "alt": "Meghan Markel and Prince Harry are off to canada",
        "P": [
            "what good can come of leaving the palace"
        ]
    },
    {
        "title": "is christian soul",
        "href": "christians-stole-soul",
        "src": "images/chill-forest-pine.jpeg",
        "alt": "picture of a forest",
        "P": [
            "mind and soul are one vessel",
            "before the Christian Damnation of the word soul "
        ]
    },
    {
        "title": "candles are better than light",
        "href": "",
        "src": "images/candle-vigil-solo-light.jpg",
        "alt": "white candle burning",
        "P": [
            "Candles are safer for eye sight than light at night"
        ]
    },
    {
        "title": "candles increase psychic abilities",
        "href": "",
        "src": "images/candle-vigil-solo-light.jpg",
        "alt": "white candle burning",
        "P": [
            "What are paranormal abilities??",
            "once establishes, what the test say",
            "finaly, Wow! just wow!"
        ]
    },
    {
        "title": "blue makes you use less salt",
        "href": "eating-with-the-color-blue.html",
        "src": "images/blue-plates-and-tables.jpg",
        "alt": "a picture of a blue plant on a table",
        "P": [
            "Can seeing the color of blue help you lower your salt consumption",
            "Harvard seems to have the answer",
            "lol,"
        ]
    },
    {
        "title": "Wemon lead earliest homosapians",
        "href": "",
        "src": "images/put-a-crown-on-it.jpg",
        "alt": "hairy female homosapian",
        "P": [
            ""
        ]
    },
    {
        "title": "Wemon were the same size as Men",
        "href": "",
        "src": "images/put-a-crown-on-it.jpg",
        "alt": "hairy female homosapian",
        "P": [
            ""
        ]
    },
    {
        "title": "Periods sync so kids can share birthdays",
        "href": "",
        "src": "images/put-a-crown-on-it.jpg",
        "alt": "hairy female homosapian",
        "P": [
            "tribal wemon needed to have babies the same age so they could have help raising them",
            "just so wemon could have help doing the chors",
            "while men were off being"
        ]
    },
    {
        "title": "Wemon have better job options",
        "href": "female-jobs-pay-more.html",
        "src": "images/female-old-family-holding-check.jfif",
        "alt": "dumb girl from the 1960s",
        "P": [
            "feminine jobs were thinking jobs",
            "modern jobs are thinking jobs",
            "secretary, nurse, assistant, manager"
        ]
    },
    {
        "title": "",
        "href": "",
        "src": "",
        "alt": "",
        "P": [
            ""
        ]
    },
    {
        "title": "",
        "href": "",
        "src": "",
        "alt": "",
        "P": [
            ""
        ]
    },
    {
        "title": "",
        "href": "",
        "src": "",
        "alt": "",
        "P": [
            ""
        ]
    }





    ,
    {
        "title": "American spy satellite gets interuptid by nosy russian counterpart...",
        "href": "",
        "src": "images/russian-flag-in-space.jfif",
        "alt": "russion satellite",
        "P": [
            ""
        ]
    },
    {
        "title": "smartest puzzle solver ever",
        "href": "",//dolfins-are-cool.html
        "src": "https://cdn.hswstatic.com/gif/smarsmartest9.jpg",
        "alt": "octopus",
        "P": [
            ""
        ]
    },
    //fastest, with a monkey




    {
        "title": "most Smartest or most Evolved",
        "href": "smart-v-evolve.html",
        "src": "",
        "alt":"modern art of darwin",
        "P": [
            ""
        ]
    },
    {
        "title": "never a Society without Wemon",
        "href": "",
        "src": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxODAxNTQ0MjA1/mother-teresa-9504160-1-402.jpg",        "alt":"mother teresa",
        "P": [
            ""
        ]
    },
    {
        "title": "Cats made Farming Possible",
        "href": "evolving-with-cats.html",
        "src": "data:image/jpeg;base64,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",
        "alt":"egyptian cat sculpture",
        "P": [
            ""
        ]
    },
    {
        "title": "meows were inherited from babies",
        "href": "moews-come-from-babies",
        "src": "https://www.aspca.org/sites/default/files/cat-care_meowing-and-yowling_main-image.jpg",
        "alt":"dumb cat meowing",
        "P": [
            ""
        ]
    },
    {
        "title": "Farming invented to Feed God",
        "href": "farming-for-a-supreme-being.html",
        "src": "data:image/jpeg;base64,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",
        "alt":"painting of zeus",
        "P": [
            ""
        ]
    },
    {
        "title": "Elon will die on Mars",
        "href": "elon-plans-to-die-off-earth-at-mars.html",
        "src": "data:image/jpeg;base64,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",
        "alt": "elon musk",
        "P": [
            ""
        ]
    }
]
var section_a = document.getElementById("articles-section");
var a_string = "";

var articleContainer = document.getElementById("articlesContainer");
var displayImg = document.getElementById("displayImg");
var voteYes = document.getElementById("voteYes");
var voteNo = document.getElementById("voteNo");
var articleTitle = document.getElementById("articleTitle");

createArticleBox();
createStaticBox();

function createArticleBox(){
    for(let i = 0; i < articles.length; i++){
        a_string += '<div class="col-xs-12 col-sm-6 col-md-4">'
                        + '<h3>'+ articles[i].title + '</h3>';
            
            a_string += '<button>Yes</button>';
            a_string += '<button>No</button>';

            a_string += '<img src="'+ articles[i].src 
                        +  '" alt="' + articles[i].alt + '">'; 
            //add the buttons
            
        a_string += '</div>';
    };
    
    section_a.innerHTML = a_string;
    a_string = "";
}

function createStaticBox() {
    console.log(articleTitle);
    articleTitle.innerHTML = articles[5].title;
    displayImg.src = articles[5].src;
    displayImg.alt = articles[5].alt;

}