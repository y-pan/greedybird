module objects{
	
	export class Dragon extends objects.GameObject{
		// PRIVATE INSTANCE VAR
		private _dy:number;  // speed
		private _dx:number;

		constructor(atlas:createjs.SpriteSheet, imageString:string, colliderRadius:number){
            super(atlas, "fly", 500, 300, colliderRadius);
			this._dx = -4;
			this._reset();
		}
		
		/**
		 * Update Method for Ocean Class
		 */
        update() {
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
			this.y = Math.floor(Math.random() * canvasHeight) + this.radius * 2;
            this.x = canvasWidth + this.radius * 2;
		}
		
		/**
		 * Check to see if ocean needs to be reset
		 */		
		private _checkBounds():void{
            if (this.x <= 0 - this.radius * 2 || this.y <= -this.radius * 2 || this.y >= canvasHeight + this.radius * 2){
				this._reset();
			}
		}
	}
}