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
            _super.call(this, "bird");
            this.x = 20;
        }
        /**
         * Update Method for Plane Class
         */
        Bird.prototype.update = function () {
            this.y = stage.mouseX;
        };
        return Bird;
    })(objects.GameObject);
    objects.Bird = Bird;
})(objects || (objects = {}));
//# sourceMappingURL=bird.js.map