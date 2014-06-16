function Snake(length, x, y, stage) {
	this.segmentSize = 10;
	this.segments = [];
	
	this.headSegment = new Segment(null, this.segmentSize*length + x, y, stage);
	this.segments.push(this.headSegment);
	
	for (var i = 1; i < length; i++) {
		var newSeg = new Segment(this.segments[i-1], (this.segmentSize*length)-(this.segmentSize*i) + x, y, stage);
		this.segments.push(newSeg);
	}
}

Snake.prototype.tick = function(e) {
	for (var i = 0; i < this.segments.length; i++) {
		this.segments[i].tick(e);
	}
};

Snake.prototype.keyPressed = function(keyCode) {
	switch (keyCode) {
	case KEYCODE_LEFT:
		if(this.segments[0].directionIsVertical)
			this.segments[0].changeDirection('left');
		break;
	case KEYCODE_RIGHT:
		if(this.segments[0].directionIsVertical)
			this.segments[0].changeDirection('right');
		break;
	case KEYCODE_DOWN:
		if(this.segments[0].directionIsHorizontal)
			this.segments[0].changeDirection('down');
		break;
	case KEYCODE_UP:
		if(this.segments[0].directionIsHorizontal)
			this.segments[0].changeDirection('up');
		break;
	default:
		break;
	}
}