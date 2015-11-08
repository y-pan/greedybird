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
            _super.call(this, blackDragonAtlas, "blackDragon", 500, 300);
            this._dx = -2;
            this._reset();
        }
        /**
         * Update Method for Ocean Class
         */
        Dragon.prototype.update = function () {
            this.tickEnabled = (createjs.Ticker.getTicks() % 4 == 1) ? true : false;
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
        };
        // PRIATE METHODS
        /**
         * Resets the Ocean to y=-960
         */
        Dragon.prototype._reset = function () {
            this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            this._dy = Math.floor(Math.random() * 5) - 2; // verticla speed
            this.y = Math.floor(Math.random() * 430) + 50;
            this.x = 700;
        };
        /**
         * Check to see if ocean needs to be reset
         */
        Dragon.prototype._checkBounds = function () {
            if (this.x <= -50 || this.y <= -50 || this.y >= 530) {
                this._reset();
            }
        };
        return Dragon;
    })(objects.GameObject);
    objects.Dragon = Dragon;
})(objects || (objects = {}));
//# sourceMappingURL=dragon.js.map