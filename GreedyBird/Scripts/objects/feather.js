var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Feather = (function (_super) {
        __extends(Feather, _super);
        function Feather(x, y) {
            _super.call(this, redFeatherAtlas, "drop", x, y, null);
        }
        /**
         * Update Method for Plane Class
         */
        Feather.prototype.update = function () {
            this.y += 8;
        };
        return Feather;
    })(objects.GameObject);
    objects.Feather = Feather;
})(objects || (objects = {}));
//# sourceMappingURL=feather.js.map