module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _bird:objects.Bird;
        private _dragon:objects.Dragon;
        private _dragons: objects.Dragon[] = [];       

        private _healthLabel: objects.Label;
        private _gameOverLabel: objects.Label;
        private _playAgainButton: objects.Button;


        private _health: number;
        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            // add background
            
            this._background = new objects.Background();
            this.addChild(this._background);

            this._health = 100;
            this._healthLabel = new objects.Label("Health: " + this._health.toString(), "20px Consolas", "#fff", 100, 30);
            this.addChild(this._healthLabel);

            this._gameOverLabel = new objects.Label("Game Over", "60px Consolas", "#0ff", 320, 240);

            

            // add bird
            this._bird = new objects.Bird();            
            this.addChild(this._bird);           
                    
            
            for (var index = 0; index < 3; index++){
                this._dragons[index] = new objects.Dragon();
                this.addChild(this._dragons[index]);
            }
            
            stage.addChild(this);
        }


        public update(): void {
            this._bird.update();
            this._background.update();
            
            //this._dragon.update();

            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();  
                this._checkDistanceBetween(this._bird, this._dragons[index]);             
            }

            /*
            for (var index = 0; index < this._clouds.length; index++) {
                this._dragon[index].update();
            }*/
        }

        /*
        private _checkCollision(): void {

            for (var index = 0; index < 3; index++) {
                this._checkDistanceBetween(this._bird, this._dragons[index]);
            }
        }
*/
        private _checkDistanceBetween(object1: objects.Bird, object2: createjs.Sprite): void {
            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= 80){
                this._health--;
                this._healthLabel.text = "Health: " + this._health.toString();

                if (this._health <= 0) {

                    this._health = 0;
                    this._healthLabel.text = "Health: " + this._health.toString();
                    this._bird.visible = false;
                    this.addChild(this._gameOverLabel);

                }
            }
        }
    }
} 