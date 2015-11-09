var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin() {
            _super.call(this, coinAtlas, "coin", 500, 300);
            this._dx = -2;
            this._reset();
        }
        /**
         * Update Method for Ocean Class
         */
        Coin.prototype.update = function () {
            this.tickEnabled = (createjs.Ticker.getTicks() % 4 == 1) ? true : false;
            this.x += this._dx;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Coin.prototype._reset = function () {
            this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            this.y = Math.floor(Math.random() * 430) + 50;
            this.x = Math.floor(Math.random() * 200) + 700;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Coin.prototype._checkBounds = function () {
            if (this.x <= -50) {
                this._reset();
            }
        };
        return Coin;
    })(objects.GameObject);
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map