// Blocky art demo
// Morph two blocky pics into one another.

s1 = "AGjA/v6aNf50DTfi0epHf1dwT0aIyatHbbatU2hydDxQeXRKyM0ur2Old2ejAGWBAEmfIJ/uU5WGWMFu9pRfqn+6/5QiAQL9b1uM3/2YEuZNANn//rJR/Uya0JT+cgXA00p6YnZFD5lZW46w/Y85zqMAv/q6QwH9JkJ9//n40N+UAHb+/ooIswCq/IT9bwTAaEh7if3+/XiFW21i/ZMufg==";
s2 = "hwDw4uxge/0AXpL9lSpX/llt2uUBAwX6AKWPpDhMcaGrm4HS2LrP4Hy4orP94KT+AGT1e6xGesdCCqH09nFy9auezMtfHkv6aauZLvyFb2pFaox4gE9O2zxovEO9IZZrCnZ2fW4lWrlKgZuOz3CQgYlKd3f+++LSfgBzXuJVonsKsOqjVBhIwk+ct7FbTmQ7MyKoqf3Ci1WIMzbk98+2/g==";

d1 = []; d2 = [];
b1 = atob(s1);
b2 = atob(s2);

for (i = 0; i < b1.length; ++i)
{
    d1.push(b1.charCodeAt(i)/255);
    d2.push(b2.charCodeAt(i)/255);
}

function tocolor(r,g,b,a)
{
    return 'rgba(' + r*256 + ',' + g*256 + ',' + b*256 + ',' + a + ')';
}

function lerp(d1, d2, f)
{
    a = [];

    for (i = 0; i < d1.length; ++i)
    {
        r = (d2[i] - d1[i]);
        a.push(d1[i] + r * f);
    }

    return a;
}

ctr = 0;
arr = [d1,d2];

function render()
{
    cur  = ((ctr/1000)>>>0) % 2;
    next = (cur+1) % 2;
    d = lerp(arr[cur], arr[next], (ctr%1000) / 1000);

    c.clearRect(0,0,600,600);

    for (i = 0; i < d.length; i += 8)
    {
        c.fillStyle = tocolor(d[i+4], d[i+5], d[i+6], d[i+7]);
        c.beginPath();
        c.rect(d[i+0] * 600, d[i+1] * 600, d[i+2] * 300, d[i+3] * 300);
        c.closePath();
        c.fill();
    }

    ctr++;
    requestAnimationFrame(render);
}

render();
