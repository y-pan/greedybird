var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Bird = (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            _super.call(this, redBirdAtlas, "redBird", 100, 100);
            this.x = 150;
        }
        /**
         * Update Method for Plane Class
         */
        Bird.prototype.update = function () {
            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;
            this.tickEnabled = (createjs.Ticker.getTicks() % 4 == 0) ? true : false;
        };
        return Bird;
    })(objects.GameObject);
    objects.Bird = Bird;
})(objects || (objects = {}));
//# sourceMappingURL=bird.js.map