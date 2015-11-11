module objects{
	
	export class Bird extends objects.GameObject {

        private _oldY: number;

		constructor(){
            super(redBirdAtlas, "fly", 150, 100, 30);	
            this._oldY = stage.mouseY;		
		}	
		
		/**
		 * Update Method for Plane Class
		 */	      

        	
        public update():void {			
            
            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;	          

            //this.gotoAndPlay("fly");
          

            //if (this.y > this._oldY + 10) {
            //    this.gotoAndPlay("down");                
            //} else if (this.y < this._oldY - 10) {
            //    this.gotoAndPlay("up");
            //} else {
            //    this.gotoAndPlay("fly");
            //}

            this._oldY = this.y;
        }        
	}
}