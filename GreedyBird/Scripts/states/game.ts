module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _bird:objects.Bird;
        //private _island:objects.Island;
        private _dragon:objects.Dragon;
        
        //private _clouds:objects.Cloud[];
        
        
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

            //this._island = new objects.Island();
            //this.addChild(this._island);

            this._dragon = new objects.Dragon();
            
            //this._clouds = new objects.Cloud[3];
            
           /* for (var index = 0; index < this._clouds.length; index++) {
                this._cloud[index] = new objects.Cloud();
                
                this.addChild(this._cloud[index]);
            }*/
           
            
            
            stage.addChild(this);
        }


        public update(): void {
            this._bird.update();
            this._background.update();
            
            this._dragon.update();

            /*
            for (var index = 0; index < this._clouds.length; index++) {
                this._dragon[index].update();
            }*/
        }
    }
} 