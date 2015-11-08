module objects{
	
	export class Dragon extends objects.GameObject{
		// PRIVATE INSTANCE VAR
		private _dy:number;  // speed
		private _dx:number;

		constructor(){
			super(blackDragonAtlas,"blackDragon", 500, 300);
			this._dx = -2;
			this._reset();
		}
		
		/**
		 * Update Method for Ocean Class
		 */
        update() {
            this.tickEnabled = (createjs.Ticker.getTicks() % 8 == 1) ? true : false;
            this.x += this._dx;
            this.y += this._dy;
            this._checkBounds();
		}
		

		// PRIATE METHODS
		
		/**
		 * Resets the Ocean to y=-960
		 */
  		private _reset():void {
			this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            this._dy = Math.floor(Math.random() * 5) - 2; // verticla speed
			this.y = Math.floor(Math.random() * 430) + 50;
			this.x = 700;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
			if(this.x <= -50 || this.y <= -50 || this.y >= 530){
				this._reset();
			}
		}
	}
}