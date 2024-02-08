var bg_img 
var playbutton, aboutbutton
var gameState = 'wait'
var background1, background2
var player, player_img
var enemy, enemy1_img, enemy2_img, enemyGroup
var bullet, bullet_img
var score = 0
var heart, heart_img
var health = 200, max_health = 200
var enemy3_img, enemy4_img, enemy5_img, enemy6_img


function preload(){

    bg_img = loadImage("assets/splash_screen.gif")
    background1 = loadImage("assets/Background 1.jpg")
    player_img = loadImage("assets/Diver.png")
    enemy1_img = loadImage("assets/fish1.png")
    enemy2_img = loadImage("assets/octopus2.png")
    bullet_img = loadImage("assets/bullet.png")
    heart_img = loadImage("assets/heart.png")
    background2 = loadImage("assets/background_9.png")
    enemy3_img = loadImage("assets/fish3.png")
    enemy4_img = loadImage("assets/eel.png")
    enemy5_img = loadImage("assets/shark1.png")
    //enemy6_img = loadImage("assets/eel.png")

}


function setup(){

    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/play_button.png")
    playbutton.position(600, 400)
    playbutton.size(300, 300)
    playbutton.hide()

    aboutbutton = createImg("assets/about_button.png")
    aboutbutton.position(750, 400)
    aboutbutton.size(300, 300)
    aboutbutton.hide()

    player = createSprite(400, 600)
    player.addImage("main", player_img)
    player.visible=false

    enemyGroup = new Group()
    bulletGroup = new Group()

    heart = createSprite(1200, 58);
    heart.addImage(heart_img);
    heart.scale = 0.2;
    heart.visible = false;

}


function draw(){    

    if(gameState === "wait"){
        background(bg_img)
        playbutton.show()
        aboutbutton.show()
    }

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";
    })
    
    if (gameState == "about") {
        aboutgame();
    }

    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    if (gameState == "play"){
        background(background1)
        player.visible = true
        spawnEnemies()
        movement()
        healthlevel1()

        for (var i = 0; i < enemyGroup.length; i++) {
            if (bulletGroup.isTouching(enemyGroup.get(i))) {
                score += 5;
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        for (var i = 0; i < enemyGroup.length; i++) {
            if (player.isTouching(enemyGroup.get(i))) {
                health -= 10
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        if (health <= 0) {

            enemyGroup.destroyEach()
            bulletGroup.destroyEach()
            player.visible=false;

            lost()
        }

        if (health > 0 && score >= 20) {

            gameState = "nextlevelinfo"
            bulletGroup.destroyEach()
            player.visible = false
            enemyGroup.destroyEach()

        }

        if (gameState == "nextlevelinfo") {

            nextlevelpopup();
            //gameState="level2";
          
            //jet.x=200;
            //jet.y=200;

        }

    }

    if (gameState == "level2"){
        background(background2)
        player.visible = true
        spawnEnemiesLevel2()
        movement()
        healthlevel1()

        for (var i = 0; i < enemyGroup.length; i++) {
            if (bulletGroup.isTouching(enemyGroup.get(i))) {
                score += 5;
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        for (var i = 0; i < enemyGroup.length; i++) {
            if (player.isTouching(enemyGroup.get(i))) {
                health -= 10
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        if (health <= 0) {

            enemyGroup.destroyEach()
            bulletGroup.destroyEach()
            player.visible=false;

            lost()
        }

        // if (health > 0 && score >= 20) {

        //     gameState = "nextlevelinfo"
        //     bulletGroup.destroyEach()
        //     player.visible = false
        //     enemyGroup.destroyEach()

        // }
    }

    if (gameState == "play" || gameState == "level2") {
        fill("black");
        textSize(30);
        text("SCORE: " + score, 50, 51);
    }

    drawSprites()

}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Dive into the ocean as scuba divers for a fishing scavenger - come explore the underwater world.",
        textAlign: "center",
        imageUrl: "assets/Splashscreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's swim!",
        confirmButtonColor: "blue",
    },

        function () {
            gameState = "wait"
        }
    )

}

function spawnEnemies() {

    if (frameCount % 100 == 0) {

        var randy = Math.round(random(50, 600))
        enemy = createSprite(width, randy);
        enemy.scale = 0.25
        enemy.velocityX = -8;
    
        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                enemy.addImage(enemy1_img)
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2_img)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }

        enemy.depth = player.depth;
        player.depth = player.depth + 1;

        enemyGroup.add(enemy);

    }

}

function spawnEnemiesLevel2() {

    if (frameCount % 80 == 0) {

        var randy = Math.round(random(50, 500))
        enemy = createSprite(width, randy);
        enemy.scale = 0.5
        enemy.velocityX = -10;
    
        var randimg = Math.round(random(1, 3))
        switch (randimg) {

            case 1:
                enemy.addImage(enemy3_img)
                enemy.scale = 0.3
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy4_img)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            case 3:
                enemy.addImage(enemy5_img)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }

        enemy.depth = player.depth;
        player.depth = player.depth + 1;

        enemyGroup.add(enemy);

    }

}


function movement() {

    if (player.y <= 60) {
        player.y = 60
    }

    if (player.y >= 550) {
        player.y = 550
    }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

    // if (keyDown("SPACE")) {
      //   spawnBullets();
     //}

}

function spawnBullets() {

    bullet = createSprite(player.x + 10, player.y + 11, 20, 20);
    bullet.addImage(bullet_img);
    bullet.scale = 0.15;
    bullet.velocityX = 10;

    bullet.depth = player.depth;
    player.depth = player.depth + 1;

    bulletGroup.add(bullet);

}

function keyReleased() {
    if (keyCode === 32) {
        //if (numberOfArrows > 0) {
            spawnBullets();
          //  numberOfArrows -= 1;
        //}
    }
}

function healthlevel1() {
    // if(gameState != "lost"){
    // heart = createSprite(590, 58);
    // heart.addImage(heart_img);
    // heart.scale = 0.2;
    heart.visible = true;

    stroke("black")
    strokeWeight(2)
    noFill()
    rect(1200, 50, max_health, 20)

    noStroke()
    fill("red")
    rect(1200, 50, health, 20)
    // }

}

function lost() {

    swal({
        title: "You LOST!",
        imageUrl: "assets/game_over.png",
        imageSize: "300x300",
        confirmButtonText: "Try Again",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )

}

function nextlevelpopup() {

    swal({
        title: "HURRAYY!! You have reached Level 2",
        text: "You defeated them:\n make a score of 50 and unlock the key to win!!!",
        imageUrl: "assets/level_up.jpg",
        imageSize: "200x200",
        confirmButtonText: "Let's Win!",
        confirmButtonColor: "brown",
    },
        function () {

            gameState = "level2"
        }

    )

}

function win() {

    swal({
        title: "You Won!",
        text: "Congratulations you won the game! \n ",
        imageUrl: "assets/win_trophy.png",
        imageSize: "200x200",
        confirmButtonText: "Restart",
        confirmButtonColor: "brown",
    },
        function () {
            window.location.reload();
        }

    )


}