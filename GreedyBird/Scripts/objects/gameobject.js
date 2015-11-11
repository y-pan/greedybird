var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++
        function GameObject(atlas, imageString, x, y, radius) {
            _super.call(this, atlas, imageString);
            this._width = this.getBounds().width;
            this._height = this.getBounds().height;
            this.radius = radius ? radius : this._height * .5;
            this.x = x;
            this.y = y;
            this.regX = this._width * .5;
            this.regY = this._height * .5;
            //this.stage.tickEnabled = false;
        }
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map