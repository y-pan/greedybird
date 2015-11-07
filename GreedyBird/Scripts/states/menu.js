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
            // hello label
            this._greedyBirdLabel = new objects.Label("Greedy Bird", "80px Consolas", "#FF0", 320, 140);
            this.addChild(this._greedyBirdLabel); // add label to the stage
            // start button
            this._startButton = new objects.Button("startButton", 320, 340);
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