var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Background = (function (_super) {
        __extends(Background, _super);
        function Background() {
            _super.call(this, assets.getResult("background"));
            this._dx = -2;
            this._reset();
        }
        // PUBLIC METHODS
        /**
         * Update Method for Ocean Class
         */
        Background.prototype.update = function () {
            this.x += this._dx;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Background.prototype._reset = function () {
            this.x = 0;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Background.prototype._checkBounds = function () {
            if (this.x <= -640) {
                this._reset();
            }
        };
        return Background;
    })(createjs.Bitmap);
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map