module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _bird:objects.Bird;
        //private _island:objects.Island;
        private _dragon:objects.Dragon;
        
        
        
        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            // add ocean
            this._background = new objects.Background();
            this.addChild(this._background);
         
            // add plane
            this._bird = new objects.Bird();
            
            this.addChild(this._bird);           
            console.log("bird: "+this._bird.getBounds().height);


            this._dragon = new objects.Dragon();
            console.log("dragon: " + this._bird.getBounds().height);
 
            
            stage.addChild(this);
        }


        public update(): void {
            this._bird.update();
            this._background.update();
            
            //this._dragon.update();

            /*
            for (var index = 0; index < this._clouds.length; index++) {
                this._dragon[index].update();
            }*/
        }
    }
} 