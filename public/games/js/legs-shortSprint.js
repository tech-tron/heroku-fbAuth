$(document).ready(function () {
    const interval = 300;
    const moveSpeed = -12;
    const jumpDelay = 4;
    // lets just add a read arbatrary number
    const jumpHeight = -50;

    var count = 0;
    var jumpCount = 0;


    var cvs = document.getElementById("canvas");
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    var ctx = cvs.getContext("2d");


















    var leg = [
        "images/legs/heels_shortSpring_156_312_cabera.png",
        "images/legs/heels_shortSpring_156_312_flipFlop.png",
        "images/legs/heels_shortSpring_156_312_hopHop.png",
        "images/legs/heels_shortSpring_156_312_scissorHalf.png",
        "images/legs/heels_shortSpring_156_312.png"
    ];

    var legsImg = new Image();
    legsImg.src = leg[Math.floor(Math.random() * leg.length)];
    var legs = {
        srcX: 0,
        srcY: 0,
        srcWidth: 156,
        srcHeight: 312,
        col: 2,
        desX: cvs.width * .1,
        desY: cvs.height * .5,
        desWidth: cvs.width * .2,
        desHeight:cvs.height * .4
    }
    function drawLegs(){
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
    //bgImg.src = "images/legs/endlessForrest_500_281.jpg";
    //bgImg.src = "images/legs/guys-staring.jpg";
    bgImg.src = "images/legs/staring_seamless.png";
    var bg = {
        srcWidth: 474,
        srcHeight: 205,
        desWidth: cvs.width,
        desHeight: cvs.height,
        xlead:0,
        xtrail: cvs.width,
        speed: moveSpeed
    }

    function drawBackground(){
        if(bg.xlead < -cvs.width - bg.speed){
            bg.xlead = cvs.width + bg.speed;
        } else {
            bg.xlead += bg.speed;
        }

        if(bg.xtrail < -cvs.width){
            bg.xtrail = cvs.width + bg.speed;
        } else {
            bg.xtrail += bg.speed;
        }


        //everything is standard but desired x
        ctx.drawImage(bgImg,0,0,bg.srcWidth,bg.srcHeight,bg.xlead,0,bg.desWidth,bg.desHeight);
        ctx.drawImage(bgImg,0,0,bg.srcWidth,bg.srcHeight,bg.xtrail,0,bg.desWidth,bg.desHeight);
    }
    

    setInterval(function () {
        if(jumpCount > 0){
            console.log('Jump!!');
            legs.desY = legs.desY = cvs.height * .5 + jumpHeight;
            jumpCount--;
            count = -1;

        } else {
            legs.desY = cvs.height * .5;
        }
        count++;
        drawBackground();
        drawLegs();

    }, interval);











    var jumpSound = new Audio("audio/boing.wav");

    document.body.onkeyup = function(e){
        console.log("space was hit!!");
        if(e.keyCode == 32){
            if(jumpCount <= 0){
                jumpCount = jumpDelay;
                jumpSound.currentTime = 0;
                jumpSound.play();
                //jumpSound.currentTime = 0;
            }
        }
    }















    var btn0 = document.getElementById("btn0");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4");

    btn0.onclick = function(e) {
        legsImg.src = leg[0];  // fastWalk
    }
    btn1.onclick = function(e) {
        legsImg.src = leg[1];  // shortSpringStep
    }
    btn2.onclick = function(e) {
        legsImg.src = leg[2];  // sprint
    }
    btn3.onclick = function(e) {
        legsImg.src = leg[3];  // justCurious
    }
    btn4.onclick = function(e) {
        legsImg.src = leg[4];  // sprinter
    }
});