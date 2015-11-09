var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            this._background = new objects.Background();
            this.addChild(this._background);
            //  label
            this._greedyBirdLabel = new objects.Label("Greedy Bird", "40px Consolas", "#FF0", 320, 35);
            this.addChild(this._greedyBirdLabel); // add label to the stage
            this._authorLabel = new objects.Label("Author: Yun Kui Pan\nLast Modified by: Yun Kui Pan\nLast Modified Date: 2015-11-08", "16px Consolas", "#fff", 450, 80);
            this._authorLabel.lineHeight = 20;
            this._authorLabel.textAlign = "center";
            this._revisionLabel = new objects.Label("Revision History: https://github.com/y-pan/greedybird", "16px Consolas", "#fff", 20, 130);
            this._revisionLabel.regX = 0;
            this._descriptonLabel = new objects.Label("Description:\n  This canvas game developed with TypeScript, createjs and stats.js.\n  To play game, click start button below to load the game. \n  Then move mouse up/down to move bird up/down.\n  Avoid dragons, catch coin and heart.", "14px Consolas", "#fff", 20, 170);
            this._descriptonLabel.lineHeight = 20;
            this._descriptonLabel.regX = 0;
            this._functionsLabel = new objects.Label("Functions:\n  _updateCoinLabelEffect(), _updateCoin_ApplyCollisionResult(),\n  _updateHeartPlus_ApplyCollisionResult(), _updateFeathers_RemoveFeathers(),\n  _updateDragons_ApplyCollisionResult(), _updateBirdHealth(), _applyGameOver(), \n  _showFeatherEffect(), _checkCollisionBetween(), _resetGame(),", "14px Consolas", "#fff", 20, 270);
            this._functionsLabel.lineHeight = 20;
            this._functionsLabel.regX = 0;
            this._classesLabel = new objects.Label("Classes:\n  Objects.background, .bird, .button, .coin, .dragon, .scene, \n  .feather, .gameobject, .heart_plus, .label", "14px Consolas", "#fff", 20, 365);
            this._classesLabel.lineHeight = 20;
            this._classesLabel.regX = 0;
            this.addChild(this._authorLabel);
            this.addChild(this._descriptonLabel);
            this.addChild(this._revisionLabel);
            this.addChild(this._functionsLabel);
            this.addChild(this._classesLabel);
            // start button
            this._startButton = new objects.Button("startButton", 320, 440);
            this._startButton.on("click", this._clickStartButton, this); // event listener
            this.addChild(this._startButton);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this._background.update();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Start Button Click
        Menu.prototype._clickStartButton = function (event) {
            //createjs.Sound.play("yay"); // activate static class play 
            changeState(config.PLAY_STATE);
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map