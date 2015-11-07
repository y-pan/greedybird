module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _background:objects.Background;
        private _greedyBirdLabel: objects.Label;
        private _startButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            this._background = new objects.Background();
            this.addChild(this._background);
            // hello label
            this._greedyBirdLabel = new objects.Label("Greedy Bird", "80px Consolas", "#FF0", 320, 140);
            
            this.addChild(this._greedyBirdLabel); // add label to the stage

            // start button
            this._startButton = new objects.Button("startButton", 320, 340);
            this._startButton.on("click", this._clickStartButton, this); // event listener
            this.addChild(this._startButton);

            stage.addChild(this);
        }


        public update(): void {
            this._background.update();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Start Button Click
        private _clickStartButton(event: createjs.MouseEvent): void {
            //createjs.Sound.play("yay"); // activate static class play 
            changeState(config.PLAY_STATE);
        }

    }


}