KEYCODE_LEFT = 37,
KEYCODE_RIGHT = 39,
KEYCODE_UP = 38,
KEYCODE_DOWN = 40;
    
var stage;
var snake;
var square;

function init() {
	stage = new createjs.Stage("gameCanvas");
	
	snake = new Snake(stage);
	stage.update();
	
	this.document.onkeydown = keyPressed;
	timeBetweenKeyPress = 0;
	
	//createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);
}

function keyPressed(event) {
	snake.changeDirection(event.keyCode);
	stage.update(e);
}

function tick(e) {
	snake.tick(e);
	stage.update(e);
}

function handleProgress() {
	loadingBar.scaleX = preload.progress * loadingBarWidth;
	
	progressPercentage = Math.round(preload.progress * 100);
	loadProgressLabel.text = progressPercentage + "% Loaded";
	
	stage.update();
}

function handleComplete() {
	backgroundImage = preload.getResult("background");
	treesImage = preload.getResult("trees");
	groundImage = preload.getResult("ground");
	
	loadProgressLabel.text = "Loading complete click to start";
	stage.update();
	
	canvas.addEventListener("click", handleClick);
}

function handleClick() {
	start();
	
	stage.removeChild(loadProgressLabel, loadingBarContainer);
	canvas.removeEventListener("click", handleClick);
}

function start() {
	background = new createjs.Bitmap(backgroundImage);
	stage.addChild(background);
	
	trees = new createjs.Bitmap(treesImage);
	stage.addChild(trees);
	
	ground = new createjs.Bitmap(groundImage);
	stage.addChild(ground);
	ground.y = 164;
	
	stage.update();
}