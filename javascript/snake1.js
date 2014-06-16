function Snake(length, x, y, stage) {
	this.segmentSize = 10;
	this.segments = [];
	
	this.segments.push(null, this.segmentSize*length, y, stage);
	
	for (var i = 1; i < length; i++) {
		this.segments.push(new Segment(this.segments[i-1],
			(this.segmentSize*length)-(this.segmentSize*i), y, stage);
	}
}

Snake.prototype.tick = function(e) {
	for each (var segment in this.segments) {
		segment.tick(e);
	}
};

Snake.prototype.keyPressed = function(keyCode) {
	switch (keyCode) {
	case KEYCODE_LEFT:
		if(this.segments[0].directionIsVertical)
			this.segments[0].direction = 'left';
		break;
	case KEYCODE_RIGHT:
		if(this.segments[0].directionIsVertical)
			this.segments[0].direction = 'right';
		break;
	case KEYCODE_DOWN:
		if(this.segments[0].directionIsHorizontal)
			this.segments[0].direction = 'down';
		break;
	case KEYCODE_UP:
		if(this.segments[0].directionIsHorizontal)
			this.segments[0].direction = 'up';
		break;
	default:
		break;
	}
}