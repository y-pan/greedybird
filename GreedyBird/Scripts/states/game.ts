module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _bird:objects.Bird;
        private _dragon:objects.Dragon;
        private _dragons: objects.Dragon[] = [];       
        private _redFeathers:objects.Feather[] = [];


        private _healthLabel: objects.Label;

        private _gameOverLabel: objects.Label;
        private _playAgainButton: objects.Button;

        //
        private _isGameOver: boolean;

        private _health: number;
        private _heartImg: createjs.Bitmap;
        private _healthBar: createjs.Shape;
        private _healthBarBorder: createjs.Shape;
        //private _healthBarBitmap: createjs.Bitmap;
        private _featherReady: boolean;        
        private _oldTime: number;
        private _nowTime: number;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            // variables
            this._oldTime = createjs.Ticker.getTicks();
            // add background
            
            this._background = new objects.Background();
            this.addChild(this._background);

            // health
            this._heartImg = new createjs.Bitmap(assets.getResult("heart"));
            this._heartImg.x = 10;
            this._heartImg.y = 10;
            this.addChild(this._heartImg);

            this._healthBarBorder = new createjs.Shape();
            this._healthBarBorder.graphics.beginStroke("#fff").drawRect(50, 15, 100, 4);
            this.addChild(this._healthBarBorder);

            this._health = 100;

            this._healthBar = new createjs.Shape();
            this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            this.addChild(this._healthBar);

            this._healthLabel = new objects.Label(this._health.toString(), "16px Consolas", "#fff", 50, 20);
            this._healthLabel.regX = 0;
            this._healthLabel.regY = 0;
            this.addChild(this._healthLabel);


            // add bird
            this._bird = new objects.Bird();            
            this.addChild(this._bird);           
                    
            
            for (var index = 0; index < 3; index++){
                this._dragons[index] = new objects.Dragon();
                this.addChild(this._dragons[index]);
            }


            // When Game Over +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            this._gameOverLabel = new objects.Label("Game Over", "60px Consolas", "#0ff", 320, 140);
            // playAgainButton
            this._playAgainButton = new objects.Button("playAgainButton", 320, 240);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);

            
            stage.addChild(this);
        } // end of start()

        //
        private _clickPlayAgainButton(event: createjs.MouseEvent): void {
            this._resetGame();
        }

        private _resetGame(): void {
            // reset
            this._health = 100;
            this._isGameOver = false;
            this._gameOverLabel.visible = false;
            this._healthLabel.text = this._health.toString();
            this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            this._bird.visible = true;
            this._bird.y = 150;
            this._playAgainButton.visible = false;
        }

        public update(): void {
            this._bird.update();
            this._background.update();
            
            this._updateDragons_CheckCollision();
            this._updateFeathers_RemoveFeathers();


        }// end of update

        private _updateDragons_CheckCollision(): void{
            // because simply reset the positions of dragons, number of dragons never change
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                if (!this._isGameOver) {
                    this._checkDistanceBetween(this._bird, this._dragons[index]);
                }
            }
        }

        private _updateFeathers_RemoveFeathers(): void {
            if (this._redFeathers.length > 0) {
                //console.log("Feathers: " + this._redFeathers.length);
                for (var i = 0, len = this._redFeathers.length; i < len; i++) {
                    this._redFeathers[i].update();
                    if (this._redFeathers[i].y > 680) {
                        this._redFeathers.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        }

        private _updateBirdHealth(): void {

            this._healthLabel.text = this._health > 0 ? this._health.toString() : "0";

            this._healthBar.graphics.clear();
            if (this._health >= 70) {
                this._healthBar.graphics.beginFill("#0f5").drawRect(50, 15, this._health, 4);
            } else if (this._health >= 40 && this._health < 70) {
                this._healthBar.graphics.beginFill("#ff0").drawRect(50, 15, this._health, 4);
            } else {
                this._healthBar.graphics.beginFill("#f00").drawRect(50, 15, this._health, 4);
            }
        }

        private _setGameOver(): void {

            this._bird.visible = false;
            this.addChild(this._gameOverLabel);
            this._isGameOver = true;

            this._playAgainButton.visible = true;
        }

        private _showHurtEffect(): void {
            // add once feather droping out but not too much
            this._nowTime = createjs.Ticker.getTicks();
            if (this._nowTime - this._oldTime >= 30) {
                this._redFeathers.push(new objects.Feather(this._bird.x, this._bird.y));
                this.addChild(this._redFeathers[this._redFeathers.length - 1]);
                this._oldTime = this._nowTime;
            }
        }

        private _checkDistanceBetween(object1: objects.Bird, object2: createjs.Sprite): void {

            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= 80){

                // health
                this._health--;
                this._updateBirdHealth();      
                this._showHurtEffect();                

                if (this._health <= 0) {
                    this._setGameOver();
                }
               
            }
        }
    }
} 