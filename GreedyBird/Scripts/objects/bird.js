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
            _super.call(this, redBirdAtlas, "fly", 150, 100, 30);
            this._oldY = stage.mouseY;
        }
        /**
         * Update Method for Plane Class
         */
        Bird.prototype.update = function () {
            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;
            //this.gotoAndPlay("fly");
            //if (this.y > this._oldY + 10) {
            //    this.gotoAndPlay("down");                
            //} else if (this.y < this._oldY - 10) {
            //    this.gotoAndPlay("up");
            //} else {
            //    this.gotoAndPlay("fly");
            //}
            this._oldY = this.y;
        };
        return Bird;
    })(objects.GameObject);
    objects.Bird = Bird;
})(objects || (objects = {}));
//# sourceMappingURL=bird.js.map