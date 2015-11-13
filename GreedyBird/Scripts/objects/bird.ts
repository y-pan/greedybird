module objects{
	
    export class Bird extends objects.GameObject {

        public _oldY: number;

        private _index: number = 0;
        //public _imageString: string


        constructor(imageString:string, y:number) {
            super(redBirdAtlas, "fly", 150, y, 30);
            //this._imageString = imageString;
            //this.y = y;
            this._oldY = this.y;
        }	
		
		/**
		 * Update Method for Plane Class
		 */
        public update(): void {

            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;
            	          
            this.framerate = 0.002;// framerate dosen't work here for gotoAnPlay()
          
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
        }
    }
}