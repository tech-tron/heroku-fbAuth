var cvs = document.getElementById("canvas");
cvs.style.width = window.innerWidth + "px";
cvs.style.height = window.innerHeight + "px";
var ctx = cvs.getContext("2d");



var bgImg = new Image();
bgImg.src = "../images/decloration.jpg";
bg = {
    x: 0,
    y: 0,
    width: cvs.width,
    height: cvs.height
}

var fgImg = new Image();
fgImg.src = "../images/crowd_420_156.png";
fg = {
    srcWidth: 420,
    srcHeight: 156,
    desWidth: cvs.width,
    desHeight: cvs.height / 5,
    x: 0,
    y: 0
}

var userImg = new Image();
userImg.src = "../images/trump_gunHand.png";
var user = {
    desX: 100,
    desY: cvs.height / 2,
    desWidth: cvs.width / 5,
    desHeight: cvs.height / 5,
    srcX: 0,
    srcY: 0,
    width: 100,
    height: 100,
    col: 5,
    rows: 4,
    run: 3,
    shoot: 4,
    currentFrame: 0
}

var bombImg = new Image();
bombImg.src = "../images/chinaBomb_156_360.png";
var explosionImg = new Image();
explosion = {
    frameCount: 16,
    srcWidth: 156,
    srcHeight: 156,
    rows: 2,
    col: 7,
    desY: 0,
    desWidth: cvs.width / 3,
    desHeight: cvs.height / 3,
    north: false
}
explosionImg.src = "../images/explosion_156.png";
bomb = {
    desX: -100,
    desY: cvs.height / 2,
    desWidth: cvs.width / 5,
    desHeight: (cvs.height * 2) / 3,
    srcWidth: 156,
    srcHeight: 360
}
//
var gameSpeed = 20;  // was 3
var halfSpeed = gameSpeed / 2;
var isShooting = false;
var floor = cvs.height - fg.desHeight;
var isBlowingUp = false;

function updateFrame() {
    user.currentFrame++;

}
function drawUserX(){
    user.srcX = (user.currentFrame % user.col) * user.width;
    user.srcY = 1 * user.height;

    ctx.drawImage(userImg, 0, user.srcX, user.srcY,
        100, user.desY,user.desWidth,user.desHeight);
}
function drawUser() {
    //this is where the frame lies on the sheet
    user.srcX = (user.currentFrame % user.col) * user.width;
    user.srcY = 1 * user.height;
    //drawBody
    if (isShooting) {
        ctx.drawImage(userImg, 0, user.srcY + user.height * 2, user.width, user.height,
            user.desX, user.desY, user.desWidth, user.desHeight
        );
    }
    else {
        //console.log("your hands should be drawing running");
        //try drawing the row 0 to see if working
        //ctx.drawImage(userImg, user.srcX, user.hand * user.height, user.width, user.height, user.desX, user.desY, user.desWidth, user.desHeight);
        ctx.drawImage(userImg, user.srcX, user.srcY + user.height * 1, user.width, user.height,
            user.desX, user.desY, user.desWidth, user.desHeight
        );

    }

}
function drawBackground() {
    //advance background
    bg.x -= gameSpeed * (3 / 5);
    //reset background pos
    if (bg.x < -bg.width) {
        //console.log("reseting background image to x = 0");
        //console.log(bg.x);
        bg.x = 0;
    }
    //drawBackground
    ctx.drawImage(bgImg, bg.x, bg.y, bg.width, bg.height);
    ctx.drawImage(bgImg, bg.x + bg.width, bg.y, bg.width, bg.height);
}
function drawForground() {
    fg.x += halfSpeed / 2;
    //your desired x should be one frame height above the screen bottom
    fg.y = cvs.height - fg.desHeight;
    if (fg.x > fg.width) {
        bg.x = 0;
    }
    //draw backgrounds
    ctx.drawImage(fgImg,
        fg.srcWidth * (user.currentFrame % 2), 0, fg.srcWidth, fg.srcHeight,
        fg.x, fg.y, fg.desWidth, fg.desHeight
    );
    ctx.drawImage(fgImg,
        fg.srcWidth * (user.currentFrame % 2), 0, fg.srcWidth, fg.srcHeight,
        fg.x - fg.desWidth, fg.y, fg.desWidth, fg.desHeight
    );
}
function drawBomb() {
    bomb.desX -= gameSpeed;
    if (bomb.desX < (0 - bomb.desWidth)) {
        //RESET if passed
        isBlowingUp = false;
        bomb.desY = Math.floor(Math.random() * cvs.height);
        bomb.desX = Math.floor(Math.random() * (cvs.width)) + cvs.width * (3 / 4);
        //needs to be randomly set
        //bomb.desY = cvs.height - (bomb.desHeight / 2);
    } else if (bomb.desX <= user.desX
        && (bomb.desX >= user.desX - (user.desWidth / 2))
        && isBlowingUp == false) {
        //just checked if we are in a bombs desX
        //console.log("inside the bomb");
        //north is about to expload
        if (user.desY
            < bomb.desY - (user.desHeight * 1.2)) {
            //check for seeing if over the top
            if (user.desY + user.desHeight
                < bomb.desY + bomb.desHeight + user.desHeight / 8) {    //north bomb
                ctx.drawImage(bombImg,
                    0 + (bomb.srcWidth * 2),
                    0,
                    bomb.srcWidth,
                    bomb.srcHeight,
                    bomb.desX,
                    bomb.desY - (bomb.desHeight + (user.desHeight * 1.1)),
                    bomb.desWidth,
                    bomb.desHeight
                )
            }
            console.log("//collision with south bomb")
            //for now this will not include the collision checker to decide if we get exploasion or chemical points
            //reset values
            explosion.north = true;//this works
            isBlowingUp = true;
            explosion.desY = user.desY;
            explosion.frameCount = 0;
        }

        //south explosion
        else if (user.desY + user.desHeight > bomb.desY + user.desHeight / 8) {
            //console.log("collision with bottom bomb");
            //if outside of collision bottom
            if (user.desY > bomb.desY + bomb.desHeight - user.desHeight) {
                //draw south bomb
                ctx.drawImage(
                    bombImg, 0, 0, bomb.srcWidth, bomb.srcHeight,
                    //
                    bomb.desX, bomb.desY, bomb.desWidth,
                    //the height at which it is drawn
                    bomb.desHeight
                );
            }
            else {
                //set the bool for the is exploading loop
                explosion.north = false;
                isBlowingUp = true;
                explosion.desY = user.desY;
                explosion.frameCount = 0;
            }
        }
        else {
            //console.log("no collision draw bomb");
            console.log("no collision, think about adding points");
            //south bomb
            ctx.drawImage(bombImg,
                0,
                0,
                bomb.srcWidth,
                bomb.srcHeight,
                bomb.desX,
                bomb.desY,
                bomb.desWidth,
                bomb.desHeight
            );
            //north bomb
            ctx.drawImage(bombImg,
                0 + (bomb.srcWidth * 2),
                0,
                bomb.srcWidth,
                bomb.srcHeight,
                bomb.desX,
                bomb.desY - (bomb.desHeight + (user.desHeight * 1.1)),
                bomb.desWidth,
                bomb.desHeight
            );
        }

    }
    else if (isBlowingUp == true) {
        //would aslo need a isbomb for the north to 
        // randomly store a bool for if it has 
        //nuclear points in it or not
        if (explosion.north === true) {
            //console.log("collide With North");
            exploadNorth();
        }
        else {
            //console.log("collide With South");
            exploadRight();
        }
        // play sound on collision
        //ahhhhh

    }
    else {
        // lower bomb not exploaded
        ctx.drawImage(
            bombImg, 0, 0, bomb.srcWidth, bomb.srcHeight,
            //
            bomb.desX, bomb.desY, bomb.desWidth,
            //the height at which it is drawn
            bomb.desHeight
        );
        // upper bomb not exploaded
        //if we did the exploaded/open bomb on top
        //collide and it spins out neon green chemical waste
        //no crowd just owows and wahsted sounds
        // on neon green spin plays wasted word sound bite
        ctx.drawImage(
            bombImg,
            0 + (bomb.srcWidth * 2),
            0,
            bomb.srcWidth,
            bomb.srcHeight,
            bomb.desX,
            bomb.desY - (bomb.desHeight + (user.desHeight * 1.1)),
            bomb.desWidth,
            bomb.desHeight
        )
    }
}
function exploadNorth() {
    //console.log("north bomb exploaded");  

    //i want this bomb to go north -= 5
    //draw bottom bomb
    //remove image when not blew up
    //probably just going to change desy to += speed times count so i can just keeep the other bomb steady at desy

    //exploded bottom bomb
    ctx.drawImage(bombImg,
        //change this to exploded
        (bomb.srcWidth * 3),
        //src
        0, bomb.srcWidth,
        bomb.srcHeight,
        bomb.desX,
        //north bomb pos above south bomb desy
        bomb.desY - (bomb.desHeight + (user.desHeight * 1.1)) + (explosion.frameCount * gameSpeed),
        bomb.desWidth,
        bomb.desHeight
    );
    //Explosion @ bottom;
    // i want explosion desy to be at the nose of the bomb
    //looks wierd when the explosion is at the bottom and the hole is at the top
    ctx.drawImage(explosionImg,
        explosion.srcWidth * (explosion.frameCount % explosion.col),
        explosion.srcHeight * Math.floor(explosion.frameCount / explosion.col),
        explosion.srcWidth,
        explosion.srcHeight,
        bomb.desX + 50,
        //bomb.desY - (explosion.desHeight + (user.desHeight * 1.1)) - (explosion.desHeight / 2),
        explosion.desY - (explosion.desHeight / 2),
        explosion.desWidth,
        explosion.desHeight
    );
    explosion.frameCount++;

    //non exploaded
    //south bomb
    ctx.drawImage(bombImg,
        0,
        0,
        bomb.srcWidth,
        bomb.srcHeight,
        bomb.desX,
        bomb.desY,
        bomb.desWidth,
        bomb.desHeight
    );

}

function exploadRight() {
    //console.log("draws explosion south: "+ explosion.frameCount);
    //sink the bomb //desy: + 5 * framecount
    //bottom bomb
    ctx.drawImage(bombImg,
        bomb.srcWidth, 0, bomb.srcWidth, bomb.srcHeight,
        //
        bomb.desX + 20, bomb.desY + gameSpeed * explosion.frameCount, bomb.desWidth,
        //the height at which it is drawn
        bomb.desHeight
    );
    //Explosion @ bottom;
    ctx.drawImage(explosionImg,
        explosion.srcWidth * (explosion.frameCount % explosion.col),
        explosion.srcHeight * Math.floor(explosion.frameCount / explosion.col),
        explosion.srcWidth,
        explosion.srcHeight,
        bomb.desX + 50,
        explosion.desY - (explosion.desHeight / 2),
        explosion.desWidth,
        explosion.desHeight
    );
    explosion.frameCount++;

    //north bomb
    ctx.drawImage(bombImg,
        0 + (bomb.srcWidth * 2),
        0,
        bomb.srcWidth,
        bomb.srcHeight,
        bomb.desX,
        bomb.desY - (bomb.desHeight + (user.desHeight * 1.1)),
        bomb.desWidth,
        bomb.desHeight
    );
}

setInterval(function () {
    //should be a set interval function
    //probably at a slower pace but 
    //set all values to 
    //make sure scree is still turned the right direction for canvas
    floor = cvs.height - fg.desHeight;
    updateFrame();
    drawBackground();
    drawUser();
    drawBomb();


    //drawForground();
    //bringing back the crowd
    //just as a wobble instead of a continouse stream
    //bounces like a pong ball
}, 100);














cvs.addEventListener("touchmove", touchHandler);

//The touchHandler function looks like this:
function touchHandler(e) {
    if(e.touches[0].pageY != user.desY) {
        user.desY = e.touches[0].pageY ;

        //let rect = cvs.getBoundingClientRect();
        //user.desY = evt.clientY - rect.top - user.height / 2; 
        // if(evt.clientY - user.height / 2 )  
        user.desY = e.touches[0].pageY - user.height / 2;
        //console.log(user.desY);
        if (user.desY < 0) {
            //console.log("president is getting close")
            console.log(user.desY + " : before set to zero");
            user.desY = 0;
        }
        else if (user.desY > floor - user.desHeight / 2) {
            //console.log("almost off canvas screen");
            //user.desY = cvs.height - user.desHeight;
            user.desY = floor - user.desHeight / 2;
        }
        else {
            //console.log("desy: "+ user.desY);

        }
        console.log("moveY:"+ user.desY);
        drawUser();

        e.preventDefault();

    }
}

cvs.addEventListener("mousemove", movePresident);
cvs.addEventListener("touchmove", movePresident);

function movePresident(evt) {
    //let rect = cvs.getBoundingClientRect();
    //user.desY = evt.clientY - rect.top - user.height / 2; 
    // if(evt.clientY - user.height / 2 )  
    user.desY = evt.clientY - (user.height / 2) 
        - window.innerHeight * .3;
    //console.log(user.desY);
    if (user.desY < 0) {
        //console.log("president is getting close")
        console.log(user.desY + " : before set to zero");
        user.desY = 0;
    }
    else if (user.desY > floor - user.desHeight / 2) {
        //console.log("almost off canvas screen");
        //user.desY = cvs.height - user.desHeight;
        user.desY = floor - user.desHeight / 2;
    }
    else {
        //console.log("desy: "+ user.desY);

    }
}