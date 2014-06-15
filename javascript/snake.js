function Segment(x, y, stage) {
    this.size = 10;
    this.body = new createjs.Shape();
    this.body.graphics.beginFill("black").drawRect(0, 0, this.size, this.size);
    this.body.x = x;
    this.body.y = y;
    stage.addChild(this.body);
    
    this.speed = .01;
    this.direction = 'right';
    this.isHead = false;
};

Segment.prototype.tick = function(e) {
    switch (this.direction) {
    case 'up':
        this.body.y = this.body.y - (e.delta)/(1000 * this.speed);
        break;
    case 'down':
        this.body.y = this.body.y + (e.delta)/(1000 * this.speed);
        break;
    case 'left':
        this.body.x = this.body.x - (e.delta)/(1000 * this.speed);
        break;
    case 'right':
        this.body.x = this.body.x + (e.delta)/(1000 * this.speed);
        break;
    default:
        break;
    }
    return;
}

function Snake(stage) {
    this.numberOfSegments = 3;
    this.segments = [];
    
    this.head = new Segment(30, 50, stage);
    this.head.isHead = true;
    this.segments.push(this.head);
    
    for(var i = 1; i < this.numberOfSegments; i++) {
        this.segments.push(new Segment((10 * this.numberOfSegments) - (10 * i), 50, stage));
    };
    
    this.speed = 10;
};

Snake.prototype.getBody = function(){
    return this.segments;
};

Snake.prototype.currentDirection = function() {
    return this.direction;
}

Snake.prototype.changeDirection = function(keyCode) {
    switch(keyCode) {
	case KEYCODE_LEFT:
	    if (this.segments[0].direction != 'left' &&
		this.segments[0].direction != 'right' &&
                this.segments[0].body.x <= this.segments[1].body.x + 10) {
		    this.segments[0].direction = 'left';
	    }
	    break;
        case KEYCODE_RIGHT:
            if (this.segments[0].direction != 'left' &&
                this.segments[0].direction != 'right' &&
                this.segments[0].body.x >= this.segments[1].body.x - 10) {
                    this.segments[0].direction = 'right';
            }
            break;
        case KEYCODE_UP:
            if (this.segments[0].direction != 'up' &&
                this.segments[0].direction != 'down' &&
                this.segments[0].body.y <= this.segments[1].body.y + 10) {
                    this.segments[0].direction = 'up';
            }
            break;
        case KEYCODE_DOWN:
            if (this.segments[0].direction != 'up' &&
                this.segments[0].direction != 'down' &&
                this.segments[0].body.y >= this.segments[1].body.y - 10) {
                    this.segments[0].direction = 'down';
            }
            break;
	}
}

Snake.prototype.tick = function(e) {
    this.segments[0].tick(e);
    
    for (var i = 1; i <= this.segments.length - 1; i++) {
        this.segments[i].tick(e);
        switch(this.segments[i].direction) {
            case 'right':
                if (this.segments[i].body.x >= this.segments[i - 1].body.x) {
                    normalizeX(this.segments[i], this.segments[i - 1]);
                }
                break;
            case 'left':
                if (this.segments[i].body.x <= this.segments[i - 1].body.x) {
                    normalizeX(this.segments[i], this.segments[i - 1]);
                }
                break;
            case 'up':
                if (this.segments[i].body.y <= this.segments[i - 1].body.y) {
                    normalizeY(this.segments[i], this.segments[i - 1]);
                }
                break;
            case 'down':
                if (this.segments[i].body.y >= this.segments[i - 1].body.y) {
                    normalizeY(this.segments[i], this.segments[i - 1]);
                }
                break;
            default:
                break;
        }
    }
    
    function normalizeX(seg1, seg2) {
        seg1.body.x = seg2.body.x;
        seg1.direction = seg2.direction;
    }
    
    function normalizeY(seg1, seg2) {
        seg1.body.y = seg2.body.y;
        seg1.direction = seg2.direction;
    }
}