module states {
    // GAME CLASS
    export class Game extends objects.Scene {

        // Variables for bird/player, and dragons/ememies 
        private _bird:objects.Bird;
        private _dragon: objects.Dragon;
        private _dragons: objects.Dragon[] = [];       

        // Variables for health
        private _health: number;
        private _heartImg: createjs.Bitmap;
        private _healthBar: createjs.Shape;
        private _healthBarBorder: createjs.Shape;
        private _healthLabel: objects.Label;
        private _heart_plus: objects.Heart_plus;
        private _oldTimeForHeart_plus: number;
        private _nowTimeForHeart_plus: number;

        // Variables for coin/score
        private _coin: objects.Coin;
        private _coinNum: number;
        private _moneyBag: createjs.Bitmap;
        private _coinLabel: objects.Label;
        private _oldTimeForCoinNum: number;
        private _nowTimeForCoinNum: number;

        // Variables for feather - effect for bird getting hurt
        private _redFeathers: objects.Feather[] = [];     
        private _featherReady: boolean;        
        private _oldTimeForFeather: number;
        private _nowTimeForFeather: number;
        
        // Other variabes
        private _background: objects.Background;
        private _backgroundMusic: createjs.Sound;
        private _isGameOver: boolean;
        private _gameOverLabel: objects.Label;
        private _playAgainButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

            this._backgroundMusic = createjs.Sound.play("digital_downtown");  

            // add background
                        
            this._background = new objects.Background();
            this.addChild(this._background);

            // add bird/player
            this._bird = new objects.Bird();
            this.addChild(this._bird);           
                    
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

            // heart_plus
            this._oldTimeForHeart_plus = createjs.Ticker.getTicks();
            this._heart_plus = new objects.Heart_plus();
            this.addChild(this._heart_plus);

            // add 3 dragons/enemies
            for (var index = 0; index < 3; index++) {
                this._dragons[index] = new objects.Dragon();
                this.addChild(this._dragons[index]);
            }

            // add coin
            this._oldTimeForCoinNum = this._oldTimeForFeather = createjs.Ticker.getTicks();
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
                        
                        
            // Variables for Game Over
            this._gameOverLabel = new objects.Label("Game Over\nYour score is: ", "30px Consolas", "#0ff", 450, 100);
            
            this._gameOverLabel.textAlign = "center";
            this.addChild(this._gameOverLabel);
            this._gameOverLabel.visible = false;

            // playAgainButton
            this._playAgainButton = new objects.Button("playAgainButton", 320, 240);
            this._playAgainButton.on("click", this._clickPlayAgainButton, this);
            this._playAgainButton.visible = false;
            this.addChild(this._playAgainButton);

            
            stage.addChild(this);
        } // end of start()

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // Event handler for "play again" button
        private _clickPlayAgainButton(event: createjs.MouseEvent): void {
            this._resetGame();
        }

        /**
         * Reset game when "play again" button clicked
         */
        private _resetGame(): void {

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
            createjs.Sound.stop();
            this._backgroundMusic = createjs.Sound.play("digital_downtown");
        }

        
        /**
         * Update coinLabel effect - text color and size
         */
        private _updateCoinLabelEffect() {
            this._nowTimeForCoinNum = createjs.Ticker.getTicks();
            if (this._nowTimeForCoinNum - this._oldTimeForCoinNum > 50) {
                this._coinLabel.color = "#fff";
                this._coinLabel.font = "16px Consolas";
                this._oldTimeForCoinNum = this._nowTimeForCoinNum;
            }
        }

        /**
         * Update coin, check collision with bird, and apply collision result
         */
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

        /**
         * Update heart, check collision with bird, and apply collision result
         */
        private _updateHeartPlus_ApplyCollisionResult(): void {
            this._heart_plus.update();
            if (!this._isGameOver && this._checkCollisionBetween(this._bird, this._heart_plus, 60)) {
                this._health = this._health > 95 ? 100 : this._health + 5;
                createjs.Sound.play("powerUp");
                this._updateBirdHealth();
                this._heart_plus.x = -50;
            }
        }
        
        /**
         * Update dragons, check collision with bird, and apply collision result
         */
        private _updateDragons_ApplyCollisionResult(): void{
            // because simply reset the positions of dragons, number of dragons never change
            for (var index = 0; index < 3; index++) {
                this._dragons[index].update();
                if (!this._isGameOver && this._checkCollisionBetween(this._bird, this._dragons[index], 60)) {

                    this._health--;
                    this._updateBirdHealth();

                    if (this._health <= 0) {
                        createjs.Sound.play("bird_scream");
                        this._applyGameOver();                      
                    } else {      
                        createjs.Sound.play("dragon_roar");                  
                        this._showFeatherEffect();                        
                        createjs.Sound.play("bird_hurt");
                    }
                }
            }
        }
   
        /**
         * Update feathers and remove feathers that are currently ouside of screen
         */
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

        /**
         * Update bird's health relavant variables including labels and bar
         */
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

        /**
         * Apply variables when game is over
         */
        private _applyGameOver(): void {

            this._bird.visible = false;
            this._gameOverLabel.visible = true;
            this._gameOverLabel.text = "Game Over\n\nYour score is: " + this._coinNum.toString();
            this._isGameOver = true;
            this._playAgainButton.visible = true;
        }

        /**
         * Show feather effect when bird gets hurt by dragon
         */
        private _showFeatherEffect(): void {
            // add once feather droping out but not too much
            this._nowTimeForFeather = createjs.Ticker.getTicks();
            if (this._nowTimeForFeather - this._oldTimeForFeather >= 30) {
                this._redFeathers.push(new objects.Feather(this._bird.x, this._bird.y));
                this.addChild(this._redFeathers[this._redFeathers.length - 1]);
                this._oldTimeForFeather = this._nowTimeForFeather;
            }
        }

        /**
         * Return true if collision occured
         */
        private _checkCollisionBetween(object1: objects.Bird, object2: createjs.Sprite, distance: number): boolean {

            if (Math.sqrt(Math.pow((object1.x - object2.x), 2) + Math.pow((object1.y - object2.y), 2)) <= distance) {

                return true;
            }
        }

        //  PUBLIC METHOD +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update(): void {

            this._bird.update();
            this._background.update();

            this._updateDragons_ApplyCollisionResult();
            this._updateFeathers_RemoveFeathers();
            this._updateCoin_ApplyCollisionResult();
            this._updateCoinLabelEffect();
            this._updateHeartPlus_ApplyCollisionResult();

            // reset music
            if (this._backgroundMusic.off) {
                this._backgroundMusic.on;
            }

        }// end of update

    }
} 