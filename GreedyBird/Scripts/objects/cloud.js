var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            _super.call(this, "cloud");
            this._dy = 5;
            this._reset();
            this._height = this.getBounds().height;
        }
        // PUBLIC METHODS
        /**
         * Update Method for Ocean Class
         */
        Cloud.prototype.update = function () {
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Cloud.prototype._reset = function () {
            this._dx = Math.floor(Math.random() * 4) - 2; // horizontal drift
            this._dy = Math.floor(Math.random() * 5) + 5; // verticla speed
            this.x = Math.floor(Math.random() * 640) + 1;
            this.y = -this._height;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Cloud.prototype._checkBounds = function () {
            if (this.y >= 480) {
                this._reset();
            }
        };
        return Cloud;
    })(createjs.Bitmap);
    objects.Cloud = Cloud;
})(objects || (objects = {}));
//# sourceMappingURL=cloud.js.map