module objects{
	
	export class GameObject extends createjs.Sprite{
		
		// PROCTECTED instance Var++++++++++++++++++++++++++++
		protected _width:number;
		protected _height:number;
        public radius: number;
		// CONSTRUCTOR ++++++++++++++++++++++++++++++++++++
		constructor(atlas:any, imageString:string, x:number, y:number, radius:number){
			super(atlas, imageString);
			
			this._width = this.getBounds().width;
            this._height = this.getBounds().height;

            this.radius = radius ? radius : this._height * .5;

            this.x = x;
            this.y = y;
			
			this.regX = this._width * .5;
			this.regY = this._height * .5;
			
            //this.stage.tickEnabled = false;
		}
	}
}