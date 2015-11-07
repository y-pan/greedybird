module objects{
	
	export class Dragon extends createjs.Bitmap{
		// PRIVATE INSTANCE VAR
		private _dy:number;  // speed
		private _dx:number;
        private _height;
        private _width;
		constructor(){
			super("blackDragon");
			
			this._dy = 5;
			this._reset();
            this._height = this.getBounds().height;
            this._width = this.getBounds().width;
		}
		
		// PUBLIC METHODS
		
		/**
		 * Update Method for Ocean Class
		 */
		public update():void{
			this.x += this._dx;
			this.y += this._dy;
			this._checkBounds();
		}
		
		// PRIATE METHODS
		
		/**
		 * Resets the Ocean to y=-960
		 */
		private _reset():void {
			this._dx = Math.floor(Math.random() * 4) + 2; // horizontal drift
            this._dy = Math.floor(Math.random() * 5) - 2; // verticla speed

			this.y = -(Math.floor(Math.random() * 430) + 50);
			this.x = -this._width * 5;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
			if(this.x <= 640){
				this._reset();
			}
		}
	}
}