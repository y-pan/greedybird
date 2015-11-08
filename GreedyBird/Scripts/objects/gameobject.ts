module objects{
	
	export class GameObject extends createjs.Sprite{
		
		// PROCTECTED instance Var++++++++++++++++++++++++++++
		protected _width:number;
		protected _height:number;
		
		// CONSTRUCTOR ++++++++++++++++++++++++++++++++++++
		constructor(atlas:any, imageString:string, x:number, y:number){
			super(atlas, imageString);
			
			this._width = this.getBounds().width;
            this._height = this.getBounds().height;

            this.x = x;
            this.y = y;
			
			this.regX = this._width * .5;
			this.regY = this._height * .5;
			
            //this.stage.tickEnabled = false;
		}
	}
}