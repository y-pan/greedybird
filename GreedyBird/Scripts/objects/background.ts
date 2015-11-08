module objects{
	
	export class Background extends createjs.Bitmap{
		// PRIVATE INSTANCE VAR
		private _dx:number;  // speed
		
		constructor(){
			super(assets.getResult("background"));
			this._dx = -1;
			this._reset();
		}
		
		// PUBLIC METHODS
		
		/**
		 * Update Method for Ocean Class
		 */
		public update():void{
			this.x += this._dx;
			this._checkBounds();
		}
		
		// PRIATE METHODS
		
		/**
		 * Resets the Ocean to y=-960
		 */
		private _reset():void {
			this.x = 0;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
			if(this.x <= -640){
				this._reset();
			}
		}
	}
}