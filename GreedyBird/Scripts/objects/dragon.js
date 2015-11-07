var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Dragon = (function (_super) {
        __extends(Dragon, _super);
        function Dragon() {
            _super.call(this, "blackDragon");
            this._dy = 5;
            this._reset();
            this._height = this.getBounds().height;
            this._width = this.getBounds().width;
        }
        // PUBLIC METHODS
        /**
         * Update Method for Ocean Class
         */
        Dragon.prototype.update = function () {
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Dragon.prototype._reset = function () {
            this._dx = Math.floor(Math.random() * 4) + 2; // horizontal drift
            this._dy = Math.floor(Math.random() * 5) - 2; // verticla speed
            this.y = -(Math.floor(Math.random() * 430) + 50);
            this.x = -this._width * 5;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Dragon.prototype._checkBounds = function () {
            if (this.x <= 640) {
                this._reset();
            }
        };
        return Dragon;
    })(createjs.Bitmap);
    objects.Dragon = Dragon;
})(objects || (objects = {}));
//# sourceMappingURL=dragon.js.map