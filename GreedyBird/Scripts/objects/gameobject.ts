module objects{
	
	export class GameObject extends createjs.Sprite{
		
		// PROCTECTED instance Var++++++++++++++++++++++++++++
		protected _width:number;
		protected _height:number;
		
		// CONSTRUCTOR ++++++++++++++++++++++++++++++++++++
		constructor(imageString:string){
			super(atlas, imageString);
			
			this._width = this.getBounds().width;
			this._height = this.getBounds().height;
			
			this.regX = this._width * .5;
			this.regY = this._height * .5;
			
		}
	}
}