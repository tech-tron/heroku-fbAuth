$(document).ready(function () {
    const gameInterval = 100;
    var interval = gameInterval;
    const moveSpeed = -12;
    const jumpDelay = 7;
    // lets just add a read arbatrary number
    const jumpHeight = -50;

    //var
    var count = 0;
    var jumpCount = 0;
    var points = 0;
    var gameOver = false;

    //canvas
    var cvs = document.getElementById("canvas");
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    var ctx = cvs.getContext("2d");


    //elements
    var scoreDisplay = document.getElementById("score");

    //imgVars
    var skirtImg = new Image();
    var legsImg = new Image();
    var bgImg = new Image();
    var go_bgImg = new Image();
    var go_scoreImg = new Image();
    var duckImg = new Image();
    var jumpImg = new Image();
    //images
    skirtImg.src = "images/legs/skirt_156_312.png";
    legsImg.src = "images/legs/legs_156_312.png";  // changed from 100 to correct 156;
    bgImg.src = "images/legs/dildo_guysStaring_312_156.png";
    go_bgImg.src = "images/legs/gameover_gold_312_156.png";
    go_scoreImg.src = "images/legs/dildo_box_468_312.png";
    duckImg.src = "images/legs/dildo_duckUnder_624_312.png";
    jumpImg.src = "../images/legs/dildo_jump_637_312.png";















    var skirt = {
        srcWidth: 156,
        srcHeight: 312,
        row: 2,
        isOn: true
    }
    function drawSkirt() {
        ctx.drawImage(skirtImg,
            count % skirt.row * skirt.srcWidth,
            0,
            skirt.srcWidth,
            skirt.srcHeight,
            legs.desX,
            legs.desY,
            legs.desWidth,
            legs.desHeight);
    }
    function removeSkirt() {
        skirt.isOn = false;
        duckObsticle.state = true;
        setRandomObsticle();
    }

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

    var bg = {
        srcWidth: 312,
        srcHeight: 156,
        row: 2,
        desWidth: cvs.width,
        desHeight: cvs.height,
        xlead: 0,
        xtrail: cvs.width,
        speed: moveSpeed
    }
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
        ctx.drawImage(bgImg, (count % bg.row) * bg.srcWidth, 0, bg.srcWidth, bg.srcHeight, bg.xlead, 0, bg.desWidth, bg.desHeight);
        ctx.drawImage(bgImg, (count % bg.row) * bg.srcWidth, 0, bg.srcWidth, bg.srcHeight, bg.xtrail, 0, bg.desWidth, bg.desHeight);
    }
    //game Over
    var go_bg = {
        srcWidth: 312,
        srcHeight: 156
    }
    var go_score = {
        srcX: 0,
        srcWidth: 468,
        srcHeight: 312,
        desX: window.innerWidth,
        desY: (.1 * window.innerHeight),
        desWidth: cvs.width * .8,
        desHeight: (.5 * cvs.height),
        acc: -55,
        finalX: .1 * cvs.width
    }



    //NPC
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





















    function setObjectSize() {
        bg.desHeight = legs.desY + legs.desHeight;
    }
    function drawGameOver() {
        //set background
        ctx.drawImage(go_bgImg,
            0, 0, go_bg.srcWidth, go_bg.srcHeight,
            0, 0, cvs.height, cvs.width);
        //move box
        if (go_score.desX > go_score.finalX) {
            go_score.desX += go_score.acc;
            go_score.srcX = 0;
        }
        else {
            go_score.desX = go_score.finalX;
            go_score.srcX = go_score.srcWidth;
            drawFinalScore();
        }
        console.log("box@" + go_score.desX);
        ctx.drawImage(go_scoreImg,
            go_score.srcX, 15, go_score.srcWidth, go_score.srcHeight,
            go_score.desX, go_score.desY, go_score.desWidth, go_score.desHeight
        );
    }
    function drawFinalScore() {
        console.log("game is over, draw score");
    }
    //score
    function drawScore() {
        scoreDisplay.innerHTML = "";
        scoreDisplay.innerHTML = points;
    }
    function score() {
        points += 4;
        drawScore();
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

    function initGame() {
        setObjectSize();
        setRandomObsticle();
        points = 0;
        gameOver = false;
        //remove top banner display none
    }




















    //jump player
    var jumpObsticle = {
        srcX: 0,
        srcY: 0,
        srcWidth: 156,
        srcHeight: 156,
        row: 1,
        desX: cvs.width,
        desY: 1,
        desWidth: 1,
        desHeight: 1,
        speed: moveSpeed * 2,
        state: true,
        imgRef: "images/legs/dildo_bounce_0",
        count: 6
    }
    function setJump() {
        jumpObsticle.desX = Math.floor(Math.random() * cvs.width) + cvs.width;
        jumpObsticle.desHeight = legs.desHeight / 3;  // id like it to be a third of the lady, maybe a half i d f k
        jumpObsticle.desY = legs.desY + legs.desHeight - jumpObsticle.desHeight;  // this should put us on the ground
        jumpObsticle.desWidth = legs.desWidth * .5; 
    }
    function checkJump() {
        //console.log("check Jump @" + jumpObsticle.desX);
        if (legs.desX + legs.desWidth > jumpObsticle.desX
            && legs.desX < jumpObsticle.desX) {
            console.log("you are over top of the dildos")
            score();
            if (jumpCount <= 0) {
                if(skirt.isOn == true){
                    removeSkirt();
                }else{
                    console.log('You loose');
                    gameOver = true;
                }
                
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

        console.log("about to draw dildos");
        // drawl bad boy
        for(var i = 0; i < jumpObsticle.count; i++){
            jumpImg.src = ""+ jumpObsticle.imgRef+ Math.floor(Math.random() * 6)+ ".png";
            console.log(jumpImg.src);
            ctx.drawImage(jumpImg,
                count % jumpObsticle.row * jumpObsticle.srcWidth,
                jumpObsticle.srcY,
                jumpObsticle.srcWidth,
                jumpObsticle.srcHeight,
                jumpObsticle.desX + (i * jumpObsticle.desWidth * .4),
                jumpObsticle.desY,
                jumpObsticle.desWidth,
                jumpObsticle.desHeight)
        }
    }


    function setDuck() {
        duckObsticle.desHeight = legs.desY + (legs.desHeight / 2);  // half way through the charachter
        duckObsticle.desX = Math.floor(Math.random() * cvs.width) + cvs.width;
        duckObsticle.desWidth = Math.floor(Math.random() * (cvs.width / 2)) * duckObsticle.lengthMultiplier + (cvs.width / 2);
    }

    function checkDuck() {
        if (duckObsticle.desX < legs.desX + legs.desWidth) {
            if (duckObsticle.state == false) {
                console.log('You got hit in the face with a giant dildo!!');
                if (skirt.isOn == true) {
                    //should be a remove life function / skirt removal
                    removeSkirt();
                } else {
                    gameOver = true;
                }
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
            if (skirt.isOn == true) {
                drawSkirt();
            }
            if (jumpObsticle.state == true) {
                //console.log("jump opsticle");
                drawJumpObsticle();
            } else {
                //console.log("duck opsticle");
                drawDuckObsticle();
            }
        } else {
            count = -1;
            drawGameOver();
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
    cvs.addEventListener("touchstart", function (e) {
        var initialX = e.originalEvent.touches[0].pageX;
    });
    cvs.addEventListener("touchend", (e) => {
        finalX = e.touches[0].pageY;
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

    //The touchHandler function looks like this:
    function touchHandler(e) {
        if (e.touches) {
            initialX = e.touches[0].pageY;
            //legs.srcY = legs.srcHeight;  // becasue she is leaned back, second
            duckObsticle.state = true;
        }
    }
    document.addEventListener('mousedown', e => {
        initialX = e.clientY;
        legs.srcY = legs.srcHeight;  // becasue she is leaned back, second
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
    document.addEventListener('touchdown', e => {
        initialX = e.clientY;
        legs.srcY = legs.srcHeight;
        console.log(legs.srcY);
        duckObsticle.state = true;
    });
    document.addEventListener('touchup', e => {
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