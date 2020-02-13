$(document).ready(function () {
    const interval = 300;
    const moveSpeed = -12;

    var count = 0;




    var cvs = document.getElementById("canvas");
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";
    var ctx = cvs.getContext("2d");

    var leg0 = "images/legs/fastWalk_100_312.png";
    var leg1 = "images/legs/heels_shortSpring_100_312.png";
    var leg2 = "images/legs/heels_sprint_156_312.png";
    var leg3 = "images/legs/justCurious_100_312.png";
    var leg4 = "images/legs/leg_sprinter_135_100.png";

    var legsImg = new Image();
    legsImg.src = leg0;
    var legs = {
        srcX: 0,
        srcY: 0,
        srcWidth: 100,
        srcHeight: 312,
        desX: cvs.width * .1,
        desY: cvs.height * .5,
        desWidth: cvs.width * .2,
        desHeight:cvs.height * .4
    }
    function drawLegs(){
        ctx.drawImage(legsImg,
            count % 2 * legs.srcWidth,
            legs.srcY,
            legs.srcWidth,
            legs.srcHeight,
            legs.desX,
            legs.desY,
            legs.desWidth,
            legs.desHeight)
    }

    var bgImg = new Image();
    bgImg.src = "images/legs/endlessForrest_500_281.jpg";
    //bgImg.src = "images/legs/guys-staring.jpg";
    var bg = {
        srcWidth: 500,
        srcHeight: 281,
        desWidth: cvs.width,
        desHeight: cvs.height,
        xlead:0,
        xtrail: cvs.width,
        speed: moveSpeed
    }
    bg.xtrail += bg.speed;
    function drawBackground(){
        if(bg.xlead < -cvs.width - bg.speed){
            bg.xlead = cvs.width + bg.speed;
        } else {
            bg.xlead += bg.speed;
        }

        if(bg.xtrail < -cvs.width){
            bg.xtrail = cvs.width + bg.speed;
        } else {
            bg.xtrail += bg.speed
        }


        //everything is standard but desired x
        ctx.drawImage(bgImg,0,0,bg.srcWidth,bg.srcHeight,bg.xlead,0,bg.desWidth,bg.desHeight);
        ctx.drawImage(bgImg,0,0,bg.srcWidth,bg.srcHeight,bg.xtrail,0,bg.desWidth,bg.desHeight);
    }
    

    setInterval(function () {
        count++;
        drawBackground();
        drawLegs();

    }, interval);


    var btn1 = document.getElementById("btn0");
    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4");

    var leg0 = "images/legs/fastWalk_100_312.png";
    var leg1 = "images/legs/heels_shortSpring_100_312.png";
    var leg2 = "images/legs/heels_sprint_156_312.png";
    var leg3 = "images/legs/justCurious_100_312.png";
    var leg4 = "images/legs/leg_sprinter_135_100.png";

    btn0.onclick = function(e) {
        legsImg.src = leg0;
        legs.srcWidth = 100;
        legs.srcheight = 312;
    }
    btn1.onclick = function(e) {
        legsImg.src = leg1;
        legs.srcWidth = 100;
        legs.srcHeight = 312;
    }
    btn2.onclick = function(e) {
        legsImg.src = leg2;
        legs.srcWidth = 156;
        legs.srcHeight = 312;
    }
    btn3.onclick = function(e) {
        legsImg.src = leg3;
        legs.srcWidth = 100;
        legs.srcheight=  312;
    }
    btn4.onclick = function(e) {
        legsImg.src = leg4;
        legs.srcWidth = 135;
        legs.srcHeight = 100;
    }
});