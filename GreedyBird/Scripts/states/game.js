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
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            // add background
            this._background = new objects.Background();
            this.addChild(this._background);
            this._health = 100;
            this._healthLabel = new objects.Label("Health: " + this._health.toString(), "20px Consolas", "#fff", 100, 30);
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
        };
        Game.prototype.update = function () {
            this._bird.update();
            this._background.update();
            //this._dragon.update();
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                this._checkDistanceBetween(this._bird, this._dragons[index]);
            }
            /*
            for (var index = 0; index < this._clouds.length; index++) {
                this._dragon[index].update();
            }*/
        };
        /*
        private _checkCollision(): void {

            for (var index = 0; index < 3; index++) {
                this._checkDistanceBetween(this._bird, this._dragons[index]);
            }
        }
*/
        Game.prototype._checkDistanceBetween = function (object1, object2) {
            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= 80) {
                this._health--;
                this._healthLabel.text = "Health: " + this._health.toString();
                if (this._health <= 0) {
                    this._health = 0;
                    this._healthLabel.text = "Health: " + this._health.toString();
                    this._bird.visible = false;
                    this.addChild(this._gameOverLabel);
                }
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map