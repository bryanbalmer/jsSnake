function Segment(leadSegment, x, y, stage) {
	this.leadSegment = leadSegment;
	
	this.size = 10;
	this.speed = 0.01;
	this.direction = 'right';
	this.pivotX;
	this.pivotY;
	
	this.body = new createjs.Shape();
	this.body.graphics.beginFill("black").drawRect(0, 0, this.size, this.size);
	this.body.x = x;
	this.body.y = y;
	stage.addChild(this.body);
}

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

Segment.prototype.move = function(e) {
	switch (this.direction) {
	case 'up':
	if (this.leadSegment.directionChanged()) {
		if (this.body.y <= this.leadSegment.pivotY) {
			this.changeDirection(this.leadSegment.direction);
			return;
		}
	}
	this.body.y = this.body.y - (e.delta) / (1000 * this.speed);
	break;

	case 'down':
	if (this.leadSegment.directionChanged()) {
		if (this.body.y >= this.leadSegment.pivotY) {
			this.changeDirection(this.leadSegment.direction);
			return;
		}
	}
	this.body.y = this.body.y + (e.delta) / (1000 * this.speed);
	break;

	case 'left':
	if (this.leadSegment.directionChanged()) {
		if (this.body.x <= this.leadSegment.pivotX) {
			this.changeDirection(this.leadSegment.direction);
			return;
		}
	}
	this.body.x = this.body.x - (e.delta) / (1000 * this.speed);
	break;

	case 'right':
	if (this.leadSegment.directionChanged()) {
		if (this.body.x >= this.leadSegment.pivotX) {
			this.changeDirection(this.leadSegment.direction);
			return;
		}
	}
	this.body.x = this.body.x + (e.delta) / (1000 * this.speed);
	break;

	default:
		break;
	}
	return;
};

Segment.prototype.moveHead = function(e) {
	switch (this.direction) {
	case 'up':
		this.body.y = this.body.y - (e.delta) / (1000 * this.speed);
		break;
	case 'down':
		this.body.y = this.body.y + (e.delta) / (1000 * this.speed);
		break;
	case 'left':
		this.body.x = this.body.x - (e.delta) / (1000 * this.speed);
		break;
	case 'right':
		this.body.x = this.body.x + (e.delta) / (1000 * this.speed);
		break;
	default:
		break;
	}
};

Segment.prototype.changeDirection = function(direction) {
	this.pivotX = this.pivotY = null;
	
	if (this.directionIsHorizontal())
		this.pivotX = this.body.x;
	if (this.directionIsVertical())
		this.pivotY = this.body.y;
		
	this.direction = direction;
};

Segment.prototype.directionChanged = function() {
	if (this.pivotX === null &&
		this.pivotY === null)
		return true;
	else
		return false;
};

Segment.prototype.directionIsHorizontal = function() {
	if (this.direction === 'left' ||
		this.direction === 'right')
		return true;
	else
		return false;
};

Segment.prototype.directionIsVertical = function() {
	return !this.directionIsHorizontal;
};

Segment.prototype.tick = function(e) {
	if (this.leadSegment != null) {
		if (this.leadSegment.direction === this.direction) {
			if (this.direction === 'up')
				this.body.y = this.leadSegment.body.y + this.size;
			if (this.direction === 'down')
				this.body.y = this.leadSegment.body.y - this.size;
			if (this.direction === 'left')
				this.body.x = this.leadSegment.body.x + this.size;
			if (this.direction === 'right')
				this.body.x = this.leadSegment.body.x - this.size;
		}
		else
			this.move(e);
	}
	else
		this.moveHead(e);
};