module objects{
	
	export class Bird extends objects.GameObject {
	
		constructor(){
			super("bird");
			
			this.x = 20;
			
		}	
		
		/**
		 * Update Method for Plane Class
		 */		
		update(){			
			this.y = stage.mouseX;	
		}
	}
}