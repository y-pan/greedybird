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
            console.log("Old: " + this._oldTime);
            // add background
            this._background = new objects.Background();
            this.addChild(this._background);
            // health
            this._heartImg = new createjs.Bitmap(assets.getResult("heart"));
            this._heartImg.x = 10;
            this._heartImg.y = 10;
            this.addChild(this._heartImg);
            this._healthBarBorder = new createjs.Shape();
            this._healthBarBorder.graphics.beginStroke("#fff").drawRect(50, 15, 100, 4);
            this.addChild(this._healthBarBorder);
            this._health = 100;
            this._healthBar = new createjs.Shape();
            this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            this.addChild(this._healthBar);
            this._healthLabel = new objects.Label(this._health.toString(), "16px Consolas", "#fff", 50, 20);
            this._healthLabel.regX = 0;
            this._healthLabel.regY = 0;
            this.addChild(this._healthLabel);
            this._gameOverLabel = new objects.Label("Game Over", "60px Consolas", "#0ff", 320, 240);
            // add bird
            this._bird = new objects.Bird();
            this.addChild(this._bird);
            for (var index = 0; index < 3; index++) {
                this._dragons[index] = new objects.Dragon();
                this.addChild(this._dragons[index]);
            }
            stage.addChild(this);
        }; // end of start()
        Game.prototype.update = function () {
            this._bird.update();
            this._background.update();
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                if (!this._isGameOver) {
                    this._checkDistanceBetween(this._bird, this._dragons[index]);
                }
            }
            //
            // update & remove feathers
            if (this._redFeathers.length > 0) {
                console.log("Feathers: " + this._redFeathers.length);
                for (var i = 0, len = this._redFeathers.length; i < len; i++) {
                    this._redFeathers[i].update();
                    if (this._redFeathers[i].y > 680) {
                        this._redFeathers.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }; // end of update
        Game.prototype._checkDistanceBetween = function (object1, object2) {
            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= 80) {
                // health
                this._health--;
                this._healthLabel.text = this._health.toString();
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
                this._nowTime = createjs.Ticker.getTicks();
                console.log("Now:" + this._nowTime);
                if (this._health <= 0) {
                    this._health = 0;
                    this._healthLabel.text = this._health.toString();
                    this._bird.visible = false;
                    this.addChild(this._gameOverLabel);
                    this._isGameOver = true;
                }
                // add once feather droping out but not too much
                if (this._nowTime - this._oldTime >= 30) {
                    this._redFeathers.push(new objects.Feather(this._bird.x, this._bird.y));
                    this.addChild(this._redFeathers[this._redFeathers.length - 1]);
                    this._oldTime = this._nowTime;
                }
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map