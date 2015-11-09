/// <reference path="../config/config.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/bird.ts" />
/// <reference path="../objects/feather.ts" />
/// <reference path="../objects/dragon.ts" />
/// <reference path="../objects/coin.ts" />
/// <reference path="../objects/heart_plus.ts" />
/// <reference path="../objects/scene.ts" />
/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />
// GLOBAL GAME FRAMEWORK VARIABLES
var assets;
var canvas;
var stage;
var stats;
var state;
var currentState; // alias for our current state
var redBirdAtlas;
var blackDragonAtlas;
var redFeatherAtlas;
var coinAtlas;
var heart_plusAtlas;
var redBirdData;
var blackDragonData;
var redFeatherData;
var coinData;
var heart_plusData;
// GAME OBJECTS
var menu;
var game;
var over;
// manifest of all our assets
var manifest = [
    { id: "background", src: "../../Assets/images/background.png" },
    { id: "startButton", src: "../../Assets/images/startButton.png" },
    { id: "nextButton", src: "../../Assets/images/nextButton.png" },
    { id: "backButton", src: "../../Assets/images/backButton.png" },
    { id: "playAgainButton", src: "../../Assets/images/playAgainButton.png" },
    { id: "heart", src: "../../Assets/images/heart.png" },
    { id: "redBird", src: "../../Assets/images/redBird.png" },
    { id: "redFeather", src: "../../Assets/images/redFeather.png" },
    { id: "blackDragon", src: "../../Assets/images/blackDragon.png" },
    { id: "coin", src: "../../Assets/images/coin.png" },
    { id: "moneyBag", src: "../../Assets/images/moneyBag.png" },
    { id: "heart_plus", src: "../../Assets/audio/heart_plus.png" },
    { id: "engine", src: "../../Assets/audio/engine.ogg" },
    { id: "thunder", src: "../../Assets/audio/thunder.ogg" },
    { id: "yay", src: "../../Assets/audio/yay.ogg" },
    { id: "dragon_roar", src: "../../Assets/audio/dragon_roar.mp3" },
    { id: "bird_hurt", src: "../../Assets/audio/bird_hurt.mp3" },
    { id: "bird_scream", src: "../../Assets/audio/bird_scream.mp3" },
    { id: "digital_downtown", src: "../../Assets/audio/digital_downtown.mp3" },
    { id: "coins_falldown", src: "../../Assets/audio/coins_falldown.wav" }
];
redBirdData = {
    "images": [
        "../../Assets/images/redBird.png"
    ],
    "frames": [
        [0, 0, 100, 80, 0, 50, 40],
        [100, 0, 100, 80, 0, 50, 40],
        [200, 0, 100, 80, 0, 50, 40],
        [300, 0, 100, 80, 0, 50, 40]
    ],
    "animations": {
        fly: {
            frames: [0, 3],
            speed: 0.0005
        }
    }
};
//     x, y, width, height, imageIndex*, regX*, regY*
coinData = {
    "images": [
        "../../Assets/images/coin.png"
    ],
    "frames": [
        [0, 0, 50, 50, 0, 25, 25],
        [50, 0, 50, 50, 0, 25, 25],
        [100, 0, 50, 50, 0, 25, 25],
        [150, 0, 50, 50, 0, 25, 25],
        [200, 0, 50, 50, 0, 25, 25],
        [250, 0, 50, 50, 0, 25, 25],
    ],
    "animations": {
        // start, end, next*, speed*
        turnaroud: [0, 5]
    }
};
redFeatherData = {
    "images": [
        "../../Assets/images/redFeather.png"
    ],
    "frames": [
        [0, 0, 100, 80, 0, 50, 40],
        [100, 0, 100, 80, 0, 50, 40]
    ],
    "animations": {
        dropingout: { frames: [0, 1] }
    }
};
blackDragonData = {
    "images": [
        "../../Assets/images/blackDragon.png"
    ],
    "frames": [
        [0, 0, 100, 100, 0, 50, 50],
        [100, 0, 100, 100, 0, 50, 50],
        [200, 0, 100, 100, 0, 50, 50],
        [300, 0, 100, 100, 0, 50, 50]
    ],
    "animations": {
        fly: {
            frames: [0, 3],
            speed: 0.0005
        } /*speed not work ? */
    }
};
heart_plusData = {
    "images": [
        "../../Assets/images/heart_plus.png"
    ],
    "frames": [
        [0, 0, 50, 45, 0, 25, 22],
        [50, 0, 50, 45, 0, 25, 22],
        [100, 0, 50, 45, 0, 25, 22],
        [150, 0, 50, 45, 0, 25, 22]
    ],
    "animations": {
        blink: { frames: [0, 3] }
    }
};
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    redBirdAtlas = new createjs.SpriteSheet(redBirdData);
    blackDragonAtlas = new createjs.SpriteSheet(blackDragonData);
    redFeatherAtlas = new createjs.SpriteSheet(redFeatherData);
    coinAtlas = new createjs.SpriteSheet(coinData);
    heart_plusAtlas = new createjs.SpriteSheet(heart_plusData);
}
function init() {
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting
    state = config.MENU_STATE;
    changeState(state);
}
// Main Game Loop
function gameLoop(event) {
    stats.begin(); // start counting
    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame
    stats.end(); // stop counting
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// state machine prep
function changeState(state) {
    // Launch various scenes
    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }
    currentState.start();
    console.log(currentState.numChildren);
}
//# sourceMappingURL=game.js.map