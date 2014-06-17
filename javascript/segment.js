function Segment(width, height, position, direction, stage) {
	this.width = width;
	this.height = height;
	this.position = position;
	this.speed = 100;
	this.velocity = Vector.vectorFromAngle(direction, this.speed);

	this.body = new createjs.Shape();
	this.body.graphics.beginFill("black").drawRect(0, 0,
		this.width, this.height);
	this.body.x = this.position.X;
	this.body.y = this.position.Y;
	stage.addChild(this.body);

}

Segment.prototype.update = function(e) {
	var vec = Vector.timesScalar(this.velocity, e.delta/1000);
	this.position.applyVector(vec);
	this.body.x = this.position.X;
	this.body.y = this.position.Y;
};

Segment.prototype.changeDirection = function(newDirection) {
	this.velocity = Vector.vectorFromAngle(newDirection, this.speed);
};
