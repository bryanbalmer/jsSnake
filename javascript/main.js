this.KEY_LEFT = 37;
this.KEY_RIGHT = 39;
this.KEY_UP = 38;
this.KEY_DOWN = 40;

this.UP = 0;
this.DOWN = 180;
this.LEFT = 270;
this.RIGHT = 90;

var stage;
var snake;
var square;
var startPoint;

function init() {
	stage = new createjs.Stage("gameCanvas");
	
	startPoint = new Point(0, 50);

	snake = new Snake(startPoint, 3, stage);
	stage.update();
	
	this.document.onkeydown = keyPressed;
	timeBetweenKeyPress = 0;
	
	//createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(30);
}

function keyPressed(event) {
	snake.keyPressed(event.keyCode);
	stage.update(event);
}

function tick(e) {
	snake.tick(e);
	stage.update(e);
}