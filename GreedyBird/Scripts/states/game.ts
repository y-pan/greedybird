module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _bird:objects.Bird;
        private _dragon: objects.Dragon;
        private _coin: objects.Coin;
        private _dragons: objects.Dragon[] = [];       
        private _redFeathers:objects.Feather[] = [];        


        private _gameOverLabel: objects.Label;
        private _playAgainButton: objects.Button;
       
        //
        private _isGameOver: boolean;

        private _health: number;
        private _heartImg: createjs.Bitmap;
        private _healthBar: createjs.Shape;
        private _healthBarBorder: createjs.Shape;
        private _healthLabel: objects.Label;

        private _heart_plus: objects.Heart_plus;

        private _coinNum: number;
        private _moneyBag: createjs.Bitmap;
        private _coinLabel: objects.Label;

        private _featherReady: boolean;        
        private _oldTimeForFeather: number;
        private _nowTimeForFeather: number;

        private _oldTimeForCoinNum: number;
        private _nowTimeForCoinNum: number;


        private _oldTimeForHeart_plus: number;
        private _nowTimeForHeart_plus: number;

        private _backgroundMusic: createjs.Sound;

             

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            this._backgroundMusic = createjs.Sound.play("digital_downtown");
            // variables
            this._oldTimeForCoinNum = this._oldTimeForFeather = createjs.Ticker.getTicks();
            // add background
            
            this._background = new objects.Background();
            this.addChild(this._background);

            // add coin
            this._coinNum = 0;
            this._moneyBag = new createjs.Bitmap(assets.getResult("moneyBag"));
            this._moneyBag.x = 180;
            this._moneyBag.y = 10;
            this.addChild(this._moneyBag);

            this._coinLabel = new objects.Label(this._coinNum.toString(), "16px Consolas", "#fff", 220, 20);
            this._coinLabel.regX = 0;
            this._coinLabel.regY = 0;
            this.addChild(this._coinLabel);

            this._coin = new objects.Coin();
            this.addChild(this._coin);

            // heart_plus
            this._oldTimeForHeart_plus = createjs.Ticker.getTicks();
            this._heart_plus = new objects.Heart_plus();
            this.addChild(this._heart_plus);

            // health
            this._health = 100;
            this._heartImg = new createjs.Bitmap(assets.getResult("heart"));
            this._heartImg.x = 10;
            this._heartImg.y = 10;
            this.addChild(this._heartImg);

            this._healthBarBorder = new createjs.Shape();
            this._healthBarBorder.graphics.beginStroke("#fff").drawRect(50, 15, 100, 4);
            this.addChild(this._healthBarBorder);
            
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
                    
            // add 3 dragons
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

            this._coinNum = 0;
            this._coinLabel.text = this._coinNum.toString();
        }
        //========================================= update ===================================
        public update(): void {
                        
            this._bird.update();
            this._background.update();            

            this._updateDragons_ApplyCollisionResult();
            this._updateFeathers_RemoveFeathers();
            this._updateCoin_ApplyCollisionResult();
            this._updateCoinLabelEffect();
            this._updateHeartPlus_ApplyCollisionResult();

        }// end of update

        private _updateCoinLabelEffect() {
            this._nowTimeForCoinNum = createjs.Ticker.getTicks();
            if (this._nowTimeForCoinNum - this._oldTimeForCoinNum > 50) {
                this._coinLabel.color = "#fff";
                this._coinLabel.font = "16px Consolas";
                this._oldTimeForCoinNum = this._nowTimeForCoinNum;
            }
        }

        private _updateCoin_ApplyCollisionResult(): void {
            this._coin.update();
            if (!this._isGameOver && this._checkCollisionBetween(this._bird, this._coin, 60)) {
                this._coin.x = -50;
                this._coinNum++;
                this._coinLabel.text = this._coinNum.toString();

                this._coinLabel.color = "#ff0";
                this._coinLabel.font = "25px Consolas";
                this._nowTimeForCoinNum = createjs.Ticker.getTicks();    
                createjs.Sound.play("coins_falldown");            
            }
        }

        private _updateHeartPlus_ApplyCollisionResult(): void {
            this._heart_plus.update();
            if (!this._isGameOver && this._checkCollisionBetween(this._bird, this._heart_plus, 60)) {
                this._health = this._health > 95 ? 100 : this._health + 5;
                this._updateBirdHealth();

                this._heart_plus.x = -50;
            }
        }
        

        private _updateDragons_ApplyCollisionResult(): void{
            // because simply reset the positions of dragons, number of dragons never change
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                if (!this._isGameOver && this._checkCollisionBetween(this._bird, this._dragons[index], 60)) {
         
                    // health
                    this._health--;
                    this._updateBirdHealth();

                    if (this._health <= 0) {
                        this._applyGameOver();
                       
                        createjs.Sound.play("bird_scream");
                    } else {      
                        createjs.Sound.play("dragon_roar");                  
                        this._showFeatherEffect();                        
                        createjs.Sound.play("bird_hurt");
                    }
                }
            }
        }


        
        /**
         * Return true if collision occured
         */
        private _checkCollisionBetween(object1: objects.Bird, object2: createjs.Sprite, distance:number): boolean {

            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= distance) {

                return true;
            }
        }


        // check coin collision

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

        private _applyGameOver(): void {

            this._bird.visible = false;
            this.addChild(this._gameOverLabel);
            this._isGameOver = true;

            this._playAgainButton.visible = true;
            
        }

        private _showFeatherEffect(): void {
            // add once feather droping out but not too much
            this._nowTimeForFeather = createjs.Ticker.getTicks();
            if (this._nowTimeForFeather - this._oldTimeForFeather >= 30) {
                this._redFeathers.push(new objects.Feather(this._bird.x, this._bird.y));
                this.addChild(this._redFeathers[this._redFeathers.length - 1]);
                this._oldTimeForFeather = this._nowTimeForFeather;
            }
        }


    }
} 