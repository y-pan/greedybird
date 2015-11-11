module objects{
	
	export class Heart_plus extends objects.GameObject{
		// PRIVATE INSTANCE VAR
		
		private _dx:number;

		constructor(){
            super(heart_plusAtlas,"blink", 500, 300, 22);
            this._dx = -3;
			this._reset();
		}
		
		/**
		 * Update Method for Ocean Class
		 */
        update() {
            this.x += this._dx;
            this._checkBounds();
		}
		

		// PRIATE METHODS
		
		/**
		 * Resets the Ocean to y=-960
		 */
  		private _reset():void {
			this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            
            this.y = Math.floor(Math.random() * canvasHeight) + this.radius * 2;
			this.x = Math.floor(Math.random() * canvasWidth) + 1700;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
			if(this.x <= -this.radius*2){
				this._reset();
			}
		}
	}
}