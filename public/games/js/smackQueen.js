$(document).ready(function () {
    const interval = 222;
    var count = 0;

    var cvs = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";

    var handsImg = new Image();
    handsImg.src = "../images/queen/smack/alt_hands.png"; // 9 x 2
    handsImg.src = "../images/queen/smack/smack_colors_156_250.png";  // 4 x 1
    handsImg.src = "../images/queen/smack/hands_156_250.png";  // 4 x 4

    const hands = {
        srcX: 0,
        srcY: 0,
        srcWidth: 156,
        srcHeight: 250,
        desX: 0,
        desY: cvs.height * .25,
        desHeight: cvs.height * .75,
        desWidth: cvs.width,
        cols: 4,
        punch: 2,
        currentFrame: 0,
        landed: false
    }

    var lilCloudImg = new Image();
    lilCloudImg.src = "../images/queen/cloudBlue_156.png";
    var bigCloudImg = new Image();
    bigCloudImg.src = "../images/queen/cloudWhite_156.png";
    const cloud = {
        srcWidth: 156,
        bigCol: 2,
        lilCol: 3
    }
    //cloud should be with queen not hands
    //needs to follow her bounce
    var dropConst = 60;
    function drawClouds() {
        //draw white cloud first if true
        if (hands.currentFrame % 2) {
            ctx.drawImage(bigCloudImg,
                cloud.srcWidth * (count % cloud.bigCol),
                0,
                cloud.srcWidth,
                //same with as height
                cloud.srcWidth,
                0,
                cvs.height / 9 + dropConst,
                cvs.width,
                cvs.height
            );
            //blue cloud little
            ctx.drawImage(lilCloudImg,
                cloud.srcWidth * (count % cloud.lilCol),
                0,
                cloud.srcWidth,
                //same with as height
                cloud.srcWidth,
                0,
                cvs.height / 9 + dropConst,
                cvs.width,
                cvs.height
            );
        }
        else {
            //blue cloud little
            ctx.drawImage(lilCloudImg,
                cloud.srcWidth * (count % cloud.lilCol),
                0,
                cloud.srcWidth,
                //same with as height
                cloud.srcWidth,
                0,
                dropConst,
                cvs.width,
                cvs.height
            );
            //white Cloud
            ctx.drawImage(bigCloudImg,
                cloud.srcWidth * (count % cloud.bigCol),
                0,
                cloud.srcWidth,
                //same with as height
                cloud.srcWidth,
                0,
                dropConst,
                cvs.width,
                cvs.height
            );
        }

    }
    function drawHands() {
        hands.currentFrame++;
        if(hands.currentFrame % hands.cols == 0){
            if(hands.srcY == hands.srcHeight){
                0
            } else {
                hands.srcY = hands.srcHeight;
            }
        }

        //this will be just a random jump
        //hands.desY = Math.random() * 30;
        //maybe a random desheight stretch cus the bottom of her arms have to stay in cornered to the bottom due to my spritesheet

        ctx.drawImage(handsImg,
            hands.srcWidth * (hands.currentFrame % hands.cols),
            0,//hands.srcY,
            hands.srcWidth,
            hands.srcHeight,
            hands.desX,
            hands.desY + dropConst,
            hands.desWidth,
            hands.desHeight + dropConst
        );
    }


    var queensImg = new Image();
    queensImg.src = "../images/queen/queen/queen_trial_punch_156_231.png";
    //the bow flip makes her seem so crazy
    //which i love/
    //but its to fast
    //maybe crop her hat to not flip
    //just have her face wigging out randomly
    
    const queen = {
        xRange: cvs.width * .1,
        yRange: 231 / 3,
        wobbleSpeed: 5,
        jumpSpeed: 1,  //freq of bounce
        srcWidth: 156,
        srcHeight: 231,
        //i dont know why this is a fraction
        //srcHeight: 231 * (3 / 5),
        desX: 0,
        srcY: 0,
        startY: 20,
        isSmack: false,
        randSmackCount: 0,
        smackMaxCount: 7,
        smackMinimum: 3,
        pause: 4,  // amopunt of time she pauses COCKS her punch back
        punchCount: 2 + 4,  // how long she punches for
        glideSpeed: 30,
        glideAcc: 0
    }
    var gaurdsImg = new Image();
    gaurdsImg.src = "../images/queen/gaurd/army.jpg";
    gaurdsImg.src = "../images/queen/gaurd/wall.jpg";
    const gaurd = {
        desY: 0,
        bounce: 5
    }

    getRandSmackCount();

    function getRandSmackCount(){
        queen.randSmackCount = 
            Math.floor(Math.random() * queen.smackMaxCount) + queen.smackMinimum;
        queen.isSmack = false;
        // console.log("random smack count set @" + queen.randSmackCount);
        count = -1;
    }
    function aboutToPunch(){
        queen.desX += queen.glideAcc;
        // maybe a sound too
    }
    function queenSmack(){
        if(count < queen.pause){
            aboutToPunch();
            //console.log("queen is aiming her fucking punch ");
        }else if(count < queen.punchCount){
            //checkImpact();
            queen.desX = 0;
            queen.desY = 0;
            queen.srcX = queen.srcWidth * 2;
        }
        else{
            getRandSmackCount();
            endPunch();
        }
        //draw the fucking image
        ctx.drawImage(queensImg,queen.srcX,queen.srcY,queen.srcWidth,queen.srcHeight,
                        queen.desX,queen.desY,cvs.width,cvs.height);
    }
    function drawQueen() {
        queen.desX += queen.wobbleSpeed;
        if (queen.desX >= queen.xRange ||
            queen.desX <= -queen.xRange) {
            queen.wobbleSpeed *= -1;
        }
        if (count % 3) {
            queen.desY = Math.random() * queen.yRange + queen.startY;  
            // fancy math to make the eye hole move around on the zoom image
        }
        queen.srcY = (queen.srcHeight * (count % 2));
        ctx.drawImage(queensImg,
            0,
            queen.srcY,
            queen.srcWidth,
            queen.srcHeight,
            queen.desX,
            queen.desY,
            cvs.width,
            cvs.height
        );
        
        if(count % queen.randSmackCount == 0
            && count > 0){
            queen.isSmack = true;
            if(queen.srcY > 0){
                queen.glideAcc = queen.glideSpeed;
            }else {
                queen.glideAcc = -queen.glideSpeed;
            }
            queen.desY = 0;
            count = -1;
            queen.srcX = queen.srcWidth;
        }
    }

    setInterval(function () {
        count++;
        //rabbit bounce
        if(count % 2 == 0){
            gaurd.desY = gaurd.bounce;
        } else {
            gaurd.desY = 0;
        }
        ctx.drawImage(gaurdsImg,0, gaurd.desY, cvs.width, cvs.height);
        if(queen.isSmack == true){
            queenSmack();
            if(hands.landed){
                handsPunch();
            }else{
                ctx.drawImage(idleImg,0,0,156,156,0,0,cvs.width,cvs.height);
            }
        } else {
            drawQueen();
            drawClouds();
            drawHands();
        }
        
    }, interval);

    var idleImg = new Image();
    idleImg.src = "../images/queen/smack/handsIdle_156.png";
    function startPunch(){
        count = -1;
        queen.punchCount =  count + 0;
        queen.pause = count + 8;
        hands.landed = true;
    }
    function handsPunch() {
        ctx.drawImage(handsImg,
            hands.srcWidth * Math.floor(count / 2),
            hands.srcY,
            hands.srcWidth,
            hands.srcHeight,
            hands.desX,
            hands.desY, // + dropConst,
            hands.desWidth,
            hands.desHeight,  // + dropConst
        );
    }
    function endPunch(){
        hands.landed = false;
    }





















    var initialX = 0;
    var finalX = 0;
    cvs.addEventListener("touchstart", (e) => {
        //if (opp.isPunching == true) {}
        if(hands.landed == false){
            initialX = e.clientX;
        }
        
    });
    cvs.addEventListener('touchup', e => {
        finalX = e.clientX;
        if (finalX - initialX > 0) {
            if(queen.desY == 0 
                && count < queen.pause){
                hands.srcY = hands.srcHeight * 2;
                startPunch();
            }
        }
        else {
            if(queen.desY > 0 
                && count < queen.pause){
                hands.srcY = hands.srcHeight * 3;
                startPunch();
            }
        }
    });
    cvs.addEventListener('mousedown', (e) => {
        //if (opp.isPunching == true) {}
        if(hands.landed == false){
            initialX = e.clientX;
            console.log('mouse button down: ' + initialX);
        }
        
    });
    cvs.addEventListener('mouseup', e => {
        finalX = e.clientX;
        if (finalX - initialX > 0) {
            if(queen.desY == 0 
                && count < queen.pause){
                console.log("gotcha bish");
                hands.srcY = hands.srcHeight * 2;
                startPunch();
            }
        }
        else {
            if(queen.desY > 0 
                && count < queen.pause){
                console.log("gotcha bish");
                hands.srcY = hands.srcHeight * 3;
                startPunch();
            }
        }
    });
});