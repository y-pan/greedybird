module objects{
	
	export class Coin extends objects.GameObject{
		// PRIVATE INSTANCE VAR
		
		private _dx:number;

		constructor(){
            super(coinAtlas,"coin", 500, 300);
			this._dx = -2;
			this._reset();
		}
		
		/**
		 * Update Method for Ocean Class
		 */
        update() {
            this.tickEnabled = (createjs.Ticker.getTicks() % 4 == 1) ? true : false;
            this.x += this._dx;
            this._checkBounds();
		}
		

		// PRIATE METHODS
		
		/**
		 * Resets the Ocean to y=-960
		 */
  		private _reset():void {
			this._dx = -(Math.floor(Math.random() * 4) + 2); // horizontal drift
            
			this.y = Math.floor(Math.random() * 430) + 50;
			this.x = 700;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
			if(this.x <= -50){
				this._reset();
			}
		}
	}
}