a.width = a.height = 960;

var startingLength = 150;
var maxDepth = 7;
var minDepth = 6;
var depthChance = 0.8;
var minLeaves = 2;
var maxLeaves = 4;
var leafChance = 0.4;
var maxAngle = 1.0;
var shrinkFactor = 0.72;

b.addEventListener("click", function(e) {
	var r = c.canvas.getBoundingClientRect();
	var clickPoint = {
		x: e.clientX - r.left,
		y: e.clientY - r.top
	};

	c.clearRect(0, 0, a.width, a.height);

	var stack = [{
		x: clickPoint.x,
		y: clickPoint.y,
		depth: 0,
		angle: Math.random() * (Math.PI / 8) + Math.PI / 16 * 15
	}];

	while (stack.length > 0) {
		var element = stack.pop();
		var endX = element.x + Math.sin(element.angle) * startingLength * Math.pow(shrinkFactor, element.depth);
		var endY = element.y + Math.cos(element.angle) * startingLength * Math.pow(shrinkFactor, element.depth);
		c.beginPath();
		c.moveTo(element.x, element.y);
		c.lineTo(endX, endY);
		c.stroke();
		if (element.depth < maxDepth && (element.depth < minDepth || Math.random() > depthChance)) {
			for (var i = 0; i < maxLeaves; ++i) {
				if (i < minLeaves || Math.random() > leafChance) {
					var newAngle = Math.random() * (2 * maxAngle) - maxAngle + element.angle;
					stack.push({
						x: endX,
						y: endY,
						depth: element.depth + 1,
						angle: newAngle
					});
				}
			}
		}
	}
});