function Segment(width, height, position, stage) {
	this.width = width;
	this.height = height;
	this.position = position;
	this.speed = 100;
	this.velocity = Vector.vectorFromAngle(90, this.speed);

	this.body = new createjs.Shape();
	this.body.graphics.beginFill("black").drawRect(position.X, position.Y, 
		this.width, this.height);
	stage.addChild(this.body);

}

Segment.prototype.update = function(e) {
	this.position.applyVector(this.velocity.timesScalar(e.delta));
}