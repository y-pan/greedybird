var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            this._dragons = [];
            this._redFeathers = [];
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            // variables
            this._oldTime = createjs.Ticker.getTicks();
            // add background
            this._background = new objects.Background();
            this.addChild(this._background);
            // add coin
            this._coinNum = 0;
            this._moneyBag = new createjs.Bitmap(assets.getResult("moneyBag"));
            this._moneyBag.x = 180;
            this._moneyBag.y = 10;
            this.addChild(this._moneyBag);
            this._coinLabel = new objects.Label(this._coinNum.toString(), "16px Consolas", "#fff", 220, 20);
            this._coinLabel.regX = 0;
            this._coinLabel.regY = 0;
            this.addChild(this._coinLabel);
            this._coin = new objects.Coin();
            this.addChild(this._coin);
            // health
            this._health = 100;
            this._heartImg = new createjs.Bitmap(assets.getResult("heart"));
            this._heartImg.x = 10;
            this._heartImg.y = 10;
            this.addChild(this._heartImg);
            this._healthBarBorder = new createjs.Shape();
            this._healthBarBorder.graphics.beginStroke("#fff").drawRect(50, 15, 100, 4);
            this.addChild(this._healthBarBorder);
            this._healthBar = new createjs.Shape();
            this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            this.addChild(this._healthBar);
            this._healthLabel = new objects.Label(this._health.toString(), "16px Consolas", "#fff", 50, 20);
            this._healthLabel.regX = 0;
            this._healthLabel.regY = 0;
            this.addChild(this._healthLabel);
            // add bird
            this._bird = new objects.Bird();
            this.addChild(this._bird);
            // add 3 dragons
            for (var index = 0; index < 3; index++) {
                this._dragons[index] = new objects.Dragon();
                this.addChild(this._dragons[index]);
            }
            // When Game Over +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this._gameOverLabel = new objects.Label("Game Over", "60px Consolas", "#0ff", 320, 140);
            // playAgainButton
            this._playAgainButton = new objects.Button("playAgainButton", 320, 240);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);
            stage.addChild(this);
        }; // end of start()
        //
        Game.prototype._clickPlayAgainButton = function (event) {
            this._resetGame();
        };
        Game.prototype._resetGame = function () {
            // reset
            this._health = 100;
            this._isGameOver = false;
            this._gameOverLabel.visible = false;
            this._healthLabel.text = this._health.toString();
            this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            this._bird.visible = true;
            this._bird.y = 150;
            this._playAgainButton.visible = false;
        };
        Game.prototype.update = function () {
            this._bird.update();
            this._background.update();
            this._coin.update();
            this._updateDragons_CheckCollision();
            this._updateFeathers_RemoveFeathers();
        }; // end of update
        Game.prototype._updateDragons_CheckCollision = function () {
            // because simply reset the positions of dragons, number of dragons never change
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                if (!this._isGameOver) {
                    this._checkDistanceBetween(this._bird, this._dragons[index]);
                }
            }
        };
        Game.prototype._checkDistanceBetween = function (object1, object2) {
            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= 80) {
                // health
                this._health--;
                this._updateBirdHealth();
                this._showHurtEffect();
                if (this._health <= 0) {
                    this._setGameOver();
                }
            }
        };
        // check coin collision
        Game.prototype._updateFeathers_RemoveFeathers = function () {
            if (this._redFeathers.length > 0) {
                //console.log("Feathers: " + this._redFeathers.length);
                for (var i = 0, len = this._redFeathers.length; i < len; i++) {
                    this._redFeathers[i].update();
                    if (this._redFeathers[i].y > 680) {
                        this._redFeathers.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        };
        Game.prototype._updateBirdHealth = function () {
            this._healthLabel.text = this._health > 0 ? this._health.toString() : "0";
            this._healthBar.graphics.clear();
            if (this._health >= 70) {
                this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            }
            else if (this._health >= 40 && this._health < 70) {
                this._healthBar.graphics.beginFill("#ff0").drawRect(50, 15, this._health, 4);
            }
            else {
                this._healthBar.graphics.beginFill("#f00").drawRect(50, 15, this._health, 4);
            }
        };
        Game.prototype._setGameOver = function () {
            this._bird.visible = false;
            this.addChild(this._gameOverLabel);
            this._isGameOver = true;
            this._playAgainButton.visible = true;
        };
        Game.prototype._showHurtEffect = function () {
            // add once feather droping out but not too much
            this._nowTime = createjs.Ticker.getTicks();
            if (this._nowTime - this._oldTime >= 30) {
                this._redFeathers.push(new objects.Feather(this._bird.x, this._bird.y));
                this.addChild(this._redFeathers[this._redFeathers.length - 1]);
                this._oldTime = this._nowTime;
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map