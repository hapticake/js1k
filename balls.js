// Verlet balls demo.
//
// For more info on verlet phsyics, read this excellent paper on hitman physics:
//
//     https://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf

COLORS = [ '#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8' ];
balls = [];
radius = 20;
g = 700;
last = 0;
onkeydown = function(e) { last = e.which; };

for (i = 0; i < 50; i++)
{
    // start in the middle
    x = 0.5 * a.width;
    y = 0.5 * a.height;

    // start with no velocity and a random color
    balls.push( { pos:     { x: x, y: y },
                  old:     { x: x, y: y },
                  color: i % COLORS.length,
                  contact: false } )
}

function animate()
{
    update();
    constrain();
    render();
    requestAnimationFrame(animate);
}

function update()
{
    // flip grav with space
    if (last == 32) { g *= -1.0; last = 0; }

    // give balls a random vel with 'b'
    if (last == 66)
        for (i = 0; i < balls.length; i++) {

            vx = -10 + Math.random() * 20;
            vy = -10 + Math.random() * 20;

            balls[i].old.x = balls[i].pos.x - vx;
            balls[i].old.y = balls[i].pos.y - vy;
            last = 0;
        }

    for (i = 0; i < balls.length; ++i)
    {
        ball = balls[i];

        tmpx = ball.pos.x;
        tmpy = ball.pos.y;

        f = ball.contact ? 0.98 : 1.0;

        // apply velocity with friction if any 
        ball.pos.x += f * (ball.pos.x - ball.old.x);
        ball.pos.y += f * (ball.pos.y - ball.old.y);

        // apply gravity force (multiply by timestep 1/60 ^ 2)
        ball.pos.y += g * (1/3600);

        // update oldpos
        ball.old.x = tmpx;
        ball.old.y = tmpy;
    }
}

// Check ball / wall collision and rectify
function constrain()
{
    for (i = 0; i < balls.length; ++i)
    {
        ball = balls[i];
        ball.contact = false;

        hx = false;
        hy = false;
        vx = ball.pos.x - ball.old.x;
        vy = ball.pos.y - ball.old.y;

        if (ball.pos.x > a.width - radius) 
        {
            ball.pos.x = a.width - radius;
            hx = true;
        }

        if (ball.pos.x < radius)
        {
            ball.pos.x = radius;
            hx = true;
        }

        if (ball.pos.y > a.height - radius)
        {
            ball.pos.y = (a.height - radius);
            hy = true;
        }

        if (ball.pos.y < radius)
        {
            ball.pos.y = radius;
            hy = true;
        }

        // if hit walls, reflect velocity (inelastically)

        if (hx) vx *= -0.25;
        if (hy) vy *= -0.25;

        // if hit wall, update oldpos by reflect, and set contact
        if (hx || hy)
        {
            ball.old.x = ball.pos.x - vx;
            ball.old.y = ball.pos.y - vy;
            ball.contact = true;
        }
    }
}

function render()
{
    c.fillStyle = "black";
    c.fillRect(0, 0, a.width, a.height);

    for (i = 0; i < balls.length; ++i)
    {
        ball = balls[i];

        c.beginPath();
        c.fillStyle = COLORS[ball.color];
        c.arc(ball.pos.x, ball.pos.y, radius, 0, Math.PI * 2);
        c.fill();
        c.lineWidth = radius * 0.25;
        c.strokeStyle = "grey";
        c.stroke();
        c.closePath();
    }
}

animate();
