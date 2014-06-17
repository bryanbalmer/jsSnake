function Snake(position, length, stage) {
	this.tailSegments = [];
	this.segmentSize = 10;
	this.direction = RIGHT;

	var headPosition = new Point(position.X + (this.segmentSize * (length - 1)), position.Y);

	this.head = new Segment(this.segmentSize, this.segmentSize, headPosition, this.direction, stage);

	for (var i = 1; i < length; i++) {
		var newSeg = new Segment(this.segmentSize, this.segmentSize,
			new Point(headPosition.X - (this.segmentSize * i), headPosition.Y), this.direction, stage);
		this.tailSegments.push(newSeg);
	}
}

Snake.prototype.tick = function(e) {
	this.head.update(e);
	for (var i = 0; i < this.tailSegments.length; i++) {
		this.tailSegments[i].update(e);
	}
};

Snake.prototype.isMovingVertical = function() {
	if (this.direction === UP ||
		this.direction === DOWN)
		return true;
	else
		return false;
}

Snake.prototype.isMovingHorizontal = function() {
	return !(this.isMovingVertical());
}

Snake.prototype.changeDirection = function(d) {
	this.head.changeDirection(d);
	this.direction = d;
}

Snake.prototype.keyPressed = function(key) {
	switch (key) {
	case KEY_UP:
		if (this.isMovingVertical())
			return;
		if (this.direction === RIGHT) {
			this.changeDirection(UP);
		}
		if (this.direction === LEFT) {
			this.changeDirection(UP);
		}
		break;
	case KEY_DOWN:
		if (this.isMovingVertical())
			return;
		if (this.direction === RIGHT) {
			this.changeDirection(DOWN);
		}
		if (this.direction === LEFT) {
			this.changeDirection(DOWN);
		}
		break;
	case KEY_LEFT:
		if (this.isMovingHorizontal())
			return;
		if (this.direction === UP) {
			this.changeDirection(LEFT);
		}
		if (this.direction === DOWN) {
			this.changeDirection(LEFT);
		}
		break;
	case KEY_RIGHT:
		if (this.isMovingHorizontal())
			return;
		if (this.direction === UP) {
			this.changeDirection(RIGHT);
		}
		if (this.direction === DOWN) {
			this.changeDirection(RIGHT);
		}
		break;
	default:
		break;
	}
};