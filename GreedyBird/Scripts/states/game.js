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
        //private _clouds:objects.Cloud[];
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
            //this._island = new objects.Island();
            //this.addChild(this._island);
            this._dragon = new objects.Dragon();
            //this._clouds = new objects.Cloud[3];
            /* for (var index = 0; index < this._clouds.length; index++) {
                 this._cloud[index] = new objects.Cloud();
                 
                 this.addChild(this._cloud[index]);
             }*/
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this._bird.update();
            this._background.update();
            this._dragon.update();
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