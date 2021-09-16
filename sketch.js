var bImg, bcg
var bird, birdImg
var pipe1, pipe2
var pipe1Img, pipe2Img
var pipe1G, pipe2G
var gameState = 1;
function preload(){
    bImg = loadImage("images/new background.png");
    birdImg = loadImage("images/flappy bird.png");
    pipe1Img = loadImage("images/pipe1.png");
    pipe2Img = loadImage("images/pipe2.png");

}
function setup(){
    createCanvas(1100, 750);
    bcg = createSprite(575, 375);
    bcg.addImage(bImg);
    bcg.scale = 0.8

    bird = createSprite(250, 300, 20, 20);
    bird.addImage(birdImg);
    bird.scale = 0.1;
    //bird.velocityX = 3;

    pipe1G = new Group();
    pipe2G = new Group();
}

function draw(){
    background('black');
    if(gameState === 1){
    mouseClicked();
    //Gravity
    bird.y = bird.y + 11;
    bcg.velocityX = -3;
    createPipes();
    if(bcg.x < 0){
        bcg.x = width/12;
    }
    if(pipe1G.isTouching(bird) || pipe2G.isTouching(bird)){
        gameState = 2;
    }
    bird.debug = true;
    }
    drawSprites();
    
    if(gameState === 2){
        textSize(50);
        text("Game Over", 250, 250);
        text("Press 'R' to restart", 250, 300)
        bcg.velocityX = 0;
        bird.velocityY = 0;
        pipe1G.setVelocityXEach(0);
        pipe2G.setVelocityXEach(0); 
        if(keyDown("r")){
            reset();
        }
    }
}
function mouseClicked(){
    bird.y = bird.y - 10;
}
function createPipes(){
    if(World.frameCount%200 === 0){
        pipe1 = createSprite(1200, 650, 40, 50);
        pipe1.addImage(pipe1Img);
        pipe1.scale = 0.3;
        pipe1.velocityX = -3;
        pipe1.lifeTime = 300;
        pipe1G.add(pipe1);
        pipe1.debug = true;
        pipe1.setCollider("rectangle", 0, 0, 40, 650)
    }
    if(World.frameCount%200 === 0){
        pipe2 = createSprite(1200, 100, 40, 50);
        pipe2.addImage(pipe2Img);
        pipe2.scale = 0.3;
        pipe2.velocityX = -3;
        pipe2.lifeTime = 300;
        pipe2G.add(pipe2);
        pipe2.debug = true;
        pipe2.setCollider("rectangle", 0, 0, 40, 650);
    }
}
function reset(){
    gameState = 1;
    pipe1G.destroyEach();
    pipe2G.destroyEach();

}
