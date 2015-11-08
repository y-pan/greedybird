module objects{
	
	export class Feather extends objects.GameObject {

		constructor(x:number,y:number){
            super(redFeatherAtlas, "redFeather", x, y); console.log("Feather");
           
		}	
		
		/**
		 * Update Method for Plane Class
		 */	      

        	
        public update():void {			          
            
            this.y += 8;
            this.tickEnabled = (createjs.Ticker.getTicks() % 8 == 1) ? true : false;

        }

        
	}
}