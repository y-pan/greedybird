module objects{
	
	export class Coin extends objects.GameObject{
		// PRIVATE INSTANCE VAR
		
		private _dx:number;

		constructor(){
            super(coinAtlas,"spin", 500, 300, 25);
			this._dx = -2;
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
            this.x = Math.floor(Math.random() * canvasWidth) + 700;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
            if (this.x <= -this.radius * 2){
				this._reset();
			}
		}
	}
}