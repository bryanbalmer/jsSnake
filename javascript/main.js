this.KEYCODE_LEFT = 37;
this.KEYCODE_RIGHT = 39;
this.KEYCODE_UP = 38;
this.KEYCODE_DOWN = 40;
    
var stage;
var snake;
var square;

function init() {
	stage = new createjs.Stage("gameCanvas");
	
	snake = new Snake(3, 0, 50, stage);
	stage.update();
	
	this.document.onkeydown = keyPressed;
	timeBetweenKeyPress = 0;
	
	//createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);
}

function keyPressed(event) {
	snake.keyPressed(event.keyCode);
	stage.update(event);
}

function tick(e) {
	snake.tick(e);
	stage.update(e);
}