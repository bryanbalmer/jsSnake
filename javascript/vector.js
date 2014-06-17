function Vector(x, y) {
	this.X = x;
	this.Y = y;
}

Vector.prototype.length = function() {
	return Math.sqrt((this.X*this.X) + (this.Y*this.Y));
};

Vector.prototype.normalize = function(){
	this.X /= this.length();
	this.Y /= this.length();
};

Vector.prototype.negate = function() {
	this.X = this.X * -1;
	this.Y = this.Y * -1;
};

Vector.vectorFromAngle = function(degrees, length) {
	var radians = (((180-degrees)/360) * 2 * Math.PI);

	var x = Math.sin(radians) * length;
	var y = Math.cos(radians) * length;
	return new Vector(x, y);
};

Vector.timesScalar = function(v, s) {
	var x = v.X * s;
	var y = v.Y * s;
	return new Vector(x, y);
}