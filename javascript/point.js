function Point(x, y) {
	this.X = x;
	this.Y = y;
}

Point.prototype.applyVector = function(v) {
	this.X += v.X;
	this.Y += v.Y;
};

Point.nextDivisibleNumber = function(n, divisor) {
	var remainder = n % divisor;
	var num = n - remainder;
	return num + divisor;
}
