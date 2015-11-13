module objects{
	
	export class Feather extends objects.GameObject {

		constructor(x:number,y:number){
            super(redFeatherAtlas, "blink", x, y, null);
		}	
		
		/**
		 * Update Method for Plane Class
		 */	      
        public update():void {			          
            this.y += 8;
        }
        
	}
}