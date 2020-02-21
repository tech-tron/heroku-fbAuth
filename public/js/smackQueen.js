$(document).ready(function () {
    const interval = 300;
    var count = 0;

    var cvs = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    cvs.style.width = window.innerWidth + "px";
    cvs.style.height = window.innerHeight + "px";

    var handsImg = new Image();
    handsImg.src = "images/queen/smack/alt_hands.png";

    const hands = {
        srcX: 0,
        srcY: 0,
        srcWidth: 156,
        srcHeight: 156,
        desX: 0,
        desY: cvs.height * .25,//0,
        desHeight: cvs.height * .75,
        desWidth: cvs.width,
        cols: 9,
        rows: 2,
        currentFrame: 0
    }

    var lilCloudImg = new Image();
    lilCloudImg.src = "images/queen/cloudBlue_156.png";
    var bigCloudImg = new Image();
    bigCloudImg.src = "images/queen/cloudWhite_156.png";
    const cloud = {
        srcWidth: 156,
        bigCol: 2,
        lilCol: 3
    }
    //cloud should be with queen not hands
    //when shes at a greater height you can see her eyes perfect
    //needs to follow her bounce
    //may use hands to follow the stretch 
    //so they are stretched smaller when she is at a low angle
    //and normal stretch when she is at the top
    var dropConst = 30;

    //clouds should follow the up down flow of
    //hands.desy
    //like a constant
    function drawClouds() {
        //draw white cloud first if true
        if (hands.currentFrame % 2) {
            ctx.drawImage(bigCloudImg,
                cloud.srcWidth * (hands.currentFrame % cloud.bigCol),
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
                cloud.srcWidth * (hands.currentFrame % cloud.lilCol),
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
                cloud.srcWidth * (hands.currentFrame % cloud.lilCol),
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
                cloud.srcWidth * (hands.currentFrame % cloud.bigCol),
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
        //this is for if the sheet is two rows
        //two rows
        //right then left
        if (hands.currentFrame <= hands.cols) {
            //hands.currentFrame++;
            //console.log("one shot animation test");
        }

        //this will be just a random jump
        //hands.desY = Math.random() * 30;

        ctx.drawImage(handsImg,
            hands.srcWidth * (hands.currentFrame % hands.cols),
            0,//hands.srcY,
            hands.srcWidth,
            hands.srcHeight,
            hands.desX,
            hands.desY + 30,  // + dropConst,
            hands.desWidth,
            hands.desHeight + 30,  // + dropConst
        );
    }


    var queensImg = new Image();
    queensImg.src = "images/queen/queen/queen_trial_punch_156_231.png";
    //the bow flip makes her seem so crazy
    //which i love/
    //but its to fast
    //maybe crop her hat to not flip
    //just have her face wigging out randomly
    
    const queen = {
        xRange: cvs.width * .1,
        yRange: 231 / 3, // half the source width
        wobbleSpeed: 5,
        jumpSpeed: 1,  // not sure what this does but changed it from one to five
        //kinda want her much fatter
        //thick like a truck
        srcWidth: 156,
        srcHeight: 231,
        //i dont know why this is a fraction
        //srcHeight: 231 * (3 / 5),
        //just move the des x and y to make float
        desX: 0,
        srcY: 0,
        startY: 20,
        isSmack: false,
        randSmackCount: 0,
        smackMaxCount: 7,
        smackMinimum: 3,
        pause: 4,  // amopunt of time she pauses COCKS her punch back
        punchCount: 2,  // how long she punches for
        glideSpeed: 0
    }
    var gaurdsImg = new Image();
    gaurdsImg.src = "images/queen/gaurd/army.jpg";
    //gaurdsImg.src = "images/queen/gaurd/wall.jpg";
    const gaurd = {
        desY: 0,
        bounce: 5
    }

    getRandSmackCount();

    function getRandSmackCount(){
        queen.randSmackCount = 
            Math.floor(Math.random() * queen.smackMaxCount) + queen.smackMinimum;
        queen.isSmack = false;
        console.log("random smack count set @" + queen.randSmackCount);
        count = -1;
        console.log("queen smack is "+ queen.isSmack);
    }
    function aboutToPunch(){
        console.log("Drawl The Bitch!!!!");
        // assum the punch position
        //queen.srcX = queen.srcWidth * 1;
        //queen.desX += queen.glideSpeed;
        // maybe a sound too
    }
    function queenSmack(){
        if(count < queen.pause){
            aboutToPunch();
            //console.log("queen is aiming her fucking punch ");
        }else if(count < queen.punchCount){
            // punch position
            // throw punch
            // wait is over
            //should have chose
            //IE
            //checkImpact();
            console.log("oh shit its over she done punched");
            queen.srcX = queen.srcWidth * 2;
        }
        else{
            getRandSmackCount();
        }
        //draw the fucking image
        ctx.drawImage(queensImg,queen.srcX,queen.srcY ,queen.srcWidth,queen.srcHeight,
            queen.desX,queen.desY,queen.desWidth,queen.desHeight);
        //ctx.drawImage(queensImg,0,0,queen.srcWidth,queen.srcHeight,0,0,cvs.width,cvs.height);
    }
    function drawQueen() {
        queen.desX += queen.wobbleSpeed;
        if (queen.desX >= queen.xRange ||
            queen.desX <= -queen.xRange) {
            queen.wobbleSpeed *= -1;
        }
        //the bottom of this range
        //she should never be so low that 
        //that her chin is on the bottom of the screen
        //bc her hat is the screen
        if (count % 3) {
            //so youre math randoming every third iteration, seems kinda taxing on the memory but ok
            // does why range not exist anymore, why doesnt she bounce!!!!!
            queen.desY = Math.random() * queen.yRange;  // fancy math to make the eye hole move around on the zoom image
            //queen.desY + queen.startY;
        }
        queen.srcY = (queen.srcHeight * (count % 2));
        ctx.drawImage(queensImg,
            0,
            queen.srcY,
            queen.srcWidth,
            queen.srcHeight,
            queen.desX,
            //0,  // desY doesnt exist yet
            queen.desY,
            cvs.width,
            cvs.height
        );
        
        if(count % queen.randSmackCount == 0
            && count > 0){
            queen.isSmack = true;
            count = -1;
            queen.srcX = queen.srcWidth;
        }
    }

    setInterval(function () {
        count++;
        //rabbit bounce
        // if(count % 2 == 0){
        //     gaurd.desY = gaurd.bounce;
        // } else {
        //     gaurd.desY = 0;
        // }
        ctx.drawImage(gaurdsImg,0, gaurd.desY, cvs.width, cvs.height);
        if(queen.isSmack == true){
            queenSmack();
        } else {
            drawQueen();
            drawClouds();
            drawHands();
        }
        
    }, interval);
});