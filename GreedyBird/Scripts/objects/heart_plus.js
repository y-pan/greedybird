var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Heart_plus = (function (_super) {
        __extends(Heart_plus, _super);
        function Heart_plus() {
            _super.call(this, heart_plusAtlas, "heart_plus", 500, 300);
            this._dx = -3;
            this._reset();
        }
        /**
         * Update Method for Ocean Class
         */
        Heart_plus.prototype.update = function () {
            this.tickEnabled = (createjs.Ticker.getTicks() % 8 == 1) ? true : false;
            this.x += this._dx;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Heart_plus.prototype._reset = function () {
            this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            this.y = Math.floor(Math.random() * 430) + 50;
            this.x = Math.floor(Math.random() * 800) + 1700;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Heart_plus.prototype._checkBounds = function () {
            if (this.x <= -50) {
                this._reset();
            }
        };
        return Heart_plus;
    })(objects.GameObject);
    objects.Heart_plus = Heart_plus;
})(objects || (objects = {}));
//# sourceMappingURL=heart_plus.js.map