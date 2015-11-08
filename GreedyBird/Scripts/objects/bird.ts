module objects{
	
	export class Bird extends objects.GameObject {

		constructor(){
            super(redBirdAtlas,"redBird",100,100);			
			this.x = 150;
            
		}	
		
		/**
		 * Update Method for Plane Class
		 */	      

        	
        public update():void {			
            
            this.y = (stage.mouseY < this._height) ? this._height : stage.mouseY;	

            this.tickEnabled = (createjs.Ticker.getTicks() % 4 == 0) ? true : false;
            
        }

        
	}
}