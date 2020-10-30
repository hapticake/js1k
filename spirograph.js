a.width = a.height = 960;
outerRadius = 240;
innerRadius = Math.random() * 200 + 40;
radiusDiff = outerRadius - innerRadius;
distance = Math.random() * 200 + 40;

getX = (theta) => radiusDiff * Math.cos(theta) + distance * Math.cos(radiusDiff / innerRadius * theta) + 480;
getY = (theta) => radiusDiff * Math.sin(theta) + distance * Math.sin(radiusDiff / innerRadius * theta) + 480;

x = getX(0);
y = getY(0);
theta = 0.05;

(function Tick(e) {
	c.beginPath();
	c.moveTo(x, y);
	theta += 0.05;
	x = getX(theta);
	y = getY(theta);
	c.lineTo(x, y);
	c.stroke();

	requestAnimationFrame(Tick);
})(0);