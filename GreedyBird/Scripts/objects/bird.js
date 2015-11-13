var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Bird = (function (_super) {
        __extends(Bird, _super);
        //public _imageString: string
        function Bird(imageString, y) {
            _super.call(this, redBirdAtlas, "fly", 150, y, 30);
            this._index = 0;
            //this._imageString = imageString;
            //this.y = y;
            this._oldY = this.y;
        }
        /**
         * Update Method for Plane Class
         */
        Bird.prototype.update = function () {
            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;
            this.framerate = 0.002; // framerate dosen't work here for gotoAnPlay()
            /*// going too fast, freamerate not work with gotoAndPlay(), and gotoAndPlay() alone won't loop but stop at the first frame

            this._index++;

            if (this.y < this._oldY) { // up   4-7

                if (this._index > 7) { this._index = 4; }
            } else if (this.y > this._oldY) { // down 8-11
                //this._imageString.replace("fly", "down");

                if (this._index > 11) {
                this._index = 8;

                }
            } else {
                if (this._index > 3) { this._index = 0; }
            }

            
            this._oldY = this.y;
            */
        };
        return Bird;
    })(objects.GameObject);
    objects.Bird = Bird;
})(objects || (objects = {}));
//# sourceMappingURL=bird.js.map