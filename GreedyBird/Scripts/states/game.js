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
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            // add ocean
            this._background = new objects.Background();
            this.addChild(this._background);
            // add plane
            this._bird = new objects.Bird();
            this.addChild(this._bird);
            console.log("bird: " + this._bird.getBounds().height);
            this._dragon = new objects.Dragon();
            console.log("dragon: " + this._bird.getBounds().height);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this._bird.update();
            this._background.update();
            //this._dragon.update();
            /*
            for (var index = 0; index < this._clouds.length; index++) {
                this._dragon[index].update();
            }*/
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map