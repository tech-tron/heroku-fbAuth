$(document).ready(function () {
    const gameInterval = 100;
    var interval = gameInterval;
    const moveSpeed = -12;
    const jumpDelay = 7;
    // lets just add a read arbatrary number
    const jumpHeight = -50;

    var count = 0;
    var jumpCount = 0;
    var points = 0;
    var gameOver = false;


    var cvs = document.getElementById("canvas");
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    var ctx = cvs.getContext("2d");




    var legsImg = new Image();
    legsImg.src = "../images/legs/heels_sprint_156_312.png";  // changed from 100 to correct 156;
    var legs = {
        srcX: 0,
        srcY: 0,
        srcWidth: 156,
        srcHeight: 312,
        col: 3,
        desX: cvs.width * .1,
        desY: cvs.height * .5,
        desWidth: cvs.width * .2,
        desHeight: cvs.height * .4
    }
    function drawLegs() {
        ctx.drawImage(legsImg,
            count % legs.col * legs.srcWidth,
            legs.srcY,
            legs.srcWidth,
            legs.srcHeight,
            legs.desX,
            legs.desY,
            legs.desWidth,
            legs.desHeight)
    }

    var bgImg = new Image();
    bgImg.src = "../images/legs/dildo_guysStaring_312_156.png";
    var bg = {
        srcWidth: 312,
        srcHeight: 156,
        desWidth: cvs.width,
        desHeight: cvs.height,
        xlead: 0,
        xtrail: cvs.width,
        speed: moveSpeed
    }
    bg.desHeight = legs.desY + legs.desHeight;
    function drawBackground() {
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        if (bg.xlead < -cvs.width) {
            bg.xlead = cvs.width;
        } else {
            bg.xlead += bg.speed;
        }

        if (bg.xtrail < -cvs.width) {
            bg.xtrail = cvs.width;
        } else {
            bg.xtrail += bg.speed;
        }


        //everything is standard but desired x
        ctx.drawImage(bgImg, 0, 0, bg.srcWidth, bg.srcHeight, bg.xlead, 0, bg.desWidth, bg.desHeight);
        ctx.drawImage(bgImg, 0, 0, bg.srcWidth, bg.srcHeight, bg.xtrail, 0, bg.desWidth, bg.desHeight);
    }
    var scoreBoardImg = new Image();
    scoreBoardImg.src = "../images/legs/dildo_winnerScreen_624.jpg";
    var scoreBoard = {
        srcWidth: 624,
        srcHeight: 624,
        desWidth: cvs.width,
        desHeight: cvs.height,
    }
    function drawScoreBoard() {
        ctx.drawImage(scoreBoardImg, 0, 0, scoreBoard.srcWidth, scoreBoard.srcHeight, 0, 0, scoreBoard.desWidth, scoreBoard.desHeight);
    }

    function score() {
        points += 4;
        console.log("scored: " + points);
    }
    function setRandomObsticle() {
        if (Math.random() > .5) {
            jumpObsticle.state = true;
        } else {
            jumpObsticle.state = false;
        }
        //jumpObsticle.state = false;
        if (jumpObsticle.state == true) {
            setJump();
        } else {
            setDuck();
        }
    }
    
    function initGame(){
        setRandomObsticle();
        points = 0;
        gameOver = false;
        //remove top banner display none
    }




















    var jumpImg = new Image();
    jumpImg.src = "../images/legs/dildo_jump_637_312.png";
    var jumpObsticle = {
        srcX: 0,
        srcY: 0,
        srcWidth: 637,
        srcHeight: 312,
        col: 1,
        desX: cvs.width,
        desY: 1,
        desWidth: 1,
        desHeight: 1,
        speed: moveSpeed * 2,
        state: true
    }
    function setJump() {
        jumpObsticle.desX = Math.floor(Math.random() * cvs.width) + cvs.width;
        jumpObsticle.desHeight = legs.desHeight / 3;  // id like it to be a third of the lady, maybe a half i d f k
        jumpObsticle.desY = legs.desY + legs.desHeight - jumpObsticle.desHeight;  // this should put us on the ground
        jumpObsticle.desWidth = legs.desWidth * 3; // 5 times the lady
    }
    function checkJump() {
        //console.log("check Jump @" + jumpObsticle.desX);
        if (legs.desX + legs.desWidth > jumpObsticle.desX
            && legs.desX < jumpObsticle.desX) {
            console.log("you are over top of the dildos")
            points++;
            if (jumpCount <= 0) {
                console.log('You loose');
                gameOver = true;
            }
        }
    }
    function drawJumpObsticle() {
        //console.log("draw dildo train!");
        if (jumpObsticle.desX > -jumpObsticle.desWidth) {
            //console.log("dildos @ " + duckObsticle.desX);
            jumpObsticle.desX += jumpObsticle.speed;
            checkJump();
        } else {
            setRandomObsticle();
            score();

        }

        // drawl bad boy
        ctx.drawImage(jumpImg,
            count % jumpObsticle.col * jumpObsticle.srcWidth,
            jumpObsticle.srcY,
            jumpObsticle.srcWidth,
            jumpObsticle.srcHeight,
            jumpObsticle.desX,
            jumpObsticle.desY,
            jumpObsticle.desWidth,
            jumpObsticle.desHeight)
    }



    //DUCK
    var duckImg = new Image();
    duckImg.src = "../images/legs/dildo_duckUnder_624_312.png";

    var duckObsticle = {
        srcX: 0,
        srcY: 0,
        srcWidth: 624,
        srcHeight: 312,
        col: 1,
        desX: cvs.width,
        desY: 0,
        desWidth: 1,
        desHeight: 1,
        speed: moveSpeed,
        state: true,
        lengthMultiplier: 2
    }
    function setDuck() {
        duckObsticle.desHeight = legs.desY + (legs.desHeight / 2);  // half way through the charachter
        duckObsticle.desX = Math.floor(Math.random() * cvs.width) + cvs.width;
        duckObsticle.desWidth = Math.floor(Math.random() * cvs.width) * duckObsticle.lengthMultiplier;
    }

    function checkDuck() {
        if (duckObsticle.desX < legs.desX + legs.desWidth) {
            //&& duckObsticle.desX + duckObsticle.width < legs.desX){
            if (duckObsticle.state == false) {
                console.log('You got hit in the face with a giant dildo!!');
                gameOver = true;
            } else {
                points++;
                console.log("ducking under the dildos");
            }
        }
    }
    function drawDuckObsticle() {
        if (duckObsticle.desX + duckObsticle.desWidth > legs.desWidth + legs.desWidth * 2) {
            //console.log("dildo flying @" + duckObsticle.desX);
            duckObsticle.desX += duckObsticle.speed;
            checkDuck();
        } else {
            setRandomObsticle();
            score();
        }

        // drawl bad boy
        ctx.drawImage(duckImg,
            count % duckObsticle.col * duckObsticle.srcWidth,
            duckObsticle.srcY,
            duckObsticle.srcWidth,
            duckObsticle.srcHeight,
            duckObsticle.desX,
            duckObsticle.desY,
            duckObsticle.desWidth,
            duckObsticle.desHeight);
    }










    initGame();
    setInterval(function () {
        if (gameOver == false) {
            if (jumpCount > 0) {
                console.log('Jump!!');
                legs.desY = legs.desY = cvs.height * .5 + jumpHeight;
                jumpCount--;
                count = -1;  // freezes the image to frame 0

            } else {
                legs.desY = cvs.height * .5;
            }
            count++;
            drawBackground();
            drawLegs();
            if (jumpObsticle.state == true) {
                //console.log("jump opsticle");
                drawJumpObsticle();
            } else {
                //console.log("duck opsticle");
                drawDuckObsticle();
            }
        } else {
            drawScoreBoard();
        }


    }, interval);














    var jumpSound = new Audio("audio/boing.wav");

    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            if (jumpCount <= 0) {
                jumpCount = jumpDelay;
                jumpSound.currentTime = 0;
                jumpSound.play();
                //jumpSound.currentTime = 0;
            }
        }
    }


    var finalX = 0;
    var initialX = 0;
    document.addEventListener('mousedown', e => {
        initialX = e.clientY;
        legs.srcY = legs.srcHeight;
        console.log(legs.srcY);
        duckObsticle.state = true;
    });
    document.addEventListener('mouseup', e => {
        finalX = e.clientY;
        legs.srcY = 0;
        duckObsticle.state = false;
        if (finalX - initialX < 0) {
            //positive slop
            if (jumpCount <= 0) {
                jumpCount = jumpDelay;
                jumpSound.currentTime = 0;
                jumpSound.play();
                //jumpSound.currentTime = 0;
            }
            console.log('up swipe!!');
        }
        else {
            console.log('down swipe');

        }
    });

























    var quitBtn = document.getElementById("quitBtn");
    quitBtn.onclick = function () {
        console.log("forfiet button clicked");
        location.replace('index-game.html');
    }
    var resumeBtn = document.getElementById("resumeBtn");
    resumeBtn.onclick = function () {
        interval = gameInterval;
        menu.style.display = "none";
        menuIcon.style.display = "inline";
    }
    var restartBtn = document.getElementById("restartBtn");
    restartBtn.onclick = function () {
        initGame();
        menu.style.display = "none";
        menuIcon.style.display = "inline";
    }
    


    var menu = document.getElementById("menu-cover");
    var menuIcon = document.getElementById("menuIcon");

    menuIcon.onclick = function () {
        console.log("Neeeeeeds a pause menu!!!!!!");
        menu.style.display = "block";
        menuIcon.style.display = "none"; 
        // may be impossible to pause
        // carry on 
        // onward and upward
        interval = 1;
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == menu) {
            menu.style.display = "none";
            menuIcon.style.display = "inline"
            interval = gameInterval;
        }
    }
});