var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane() {
            _super.call(this, "plane");
            this.y = 430;
        }
        /**
         * Update Method for Plane Class
         */
        Plane.prototype.update = function () {
            this.x = stage.mouseX;
        };
        return Plane;
    })(objects.GameObject);
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map