var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Island = (function (_super) {
        __extends(Island, _super);
        function Island() {
            _super.call(this, "island");
            this._dy = 5;
            this._reset();
            this._height = this.getBounds().height;
        }
        // PUBLIC METHODS
        /**
         * Update Method for Ocean Class
         */
        Island.prototype.update = function () {
            this.y += this._dy;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Island.prototype._reset = function () {
            this.x = Math.floor(Math.random() * 640) + 1;
            this.y = -this._height;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Island.prototype._checkBounds = function () {
            if (this.y >= 480) {
                this._reset();
            }
        };
        return Island;
    })(createjs.Bitmap);
    objects.Island = Island;
})(objects || (objects = {}));
//# sourceMappingURL=island.js.map