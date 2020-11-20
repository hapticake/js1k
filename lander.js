//
// A little lander game. Inspired by an old dos game called graviton, which
// in turn was a rip of atari gravitar.
//
// The big grandaddy is Lunar Lander of course.

W=960;
H=600;
M=Math;
B=M.sin;
Q=M.acos;
G=M.cos;
R=(p=1)=>p*M.random();
Z=M.abs;

V=(x=0,y=x)=>({x,y});
S=(a,b)=>V(a.x-b.x,a.y-b.y);
P=(a,t=1)=>V(a.x*t,a.y*t);
A=(a,b)=>V(a.x+b.x,a.y+b.y);
Y=v=>V(v.x*15+ W/2, v.y*-15+ H/2);
U=()=>R(2*M.PI);

k=[];
onkeyup=onkeydown=e=>k[e.which] = e.type[5];

I=()=>{ 
    O = V(R(50)-25,17 - R(10));
    L = A(O, V(R(.2)-.1, R(.2)-.1));
    a=U();
    st=0; // 0=flying,1=landed,2=dead,3=dead,4=dead
    T=0;
    f=200;
};

l=(a, b)=> {
    c.lineWidth=3;
    c.strokeStyle=K;
    a = Y(a);
    b = Y(b);
    c.beginPath();
    c.moveTo(a.x, a.y);
    c.lineTo(b.x, b.y);
    c.stroke();
};

N=()=>{

    c.fillRect(0,0,W,H);

    if (st == 0) // flying
    {
        if (k[90]) a += .05;
        if (k[88]) a -= .05;
        tv = V( -B(a) , G(a) );

        _ = P(O);
        E = S(O, L);
        O = A(O, E);
        L = _ ;
        O.y -= 1/360;

        if (k[190] && f)
            O = A(O, P(tv,1/180)),
            f--;
    }

    s = [ V(-1,-5/6), V(1,-5/6), V(0,10/6), V(0,-11/6) ];
    cc = 0;

    for (i = 0; i < 4; ++i)
        p=s[i],
        // rotate, then translate
        p = A( V( p.x*G(a) - p.y*B(a) , p.x*B(a) + p.y*G(a) ), O ),
        // check first 3 for Klision
        cc |= (i<3) & ((Z(p.x) > 32) | (Z(p.y) > 20)),
        // update
        s[i]=p;

    if (cc & !st) // collision response
    {
        if (O.y > 2)
            st=2; // hit wall
        else if ((E.x * E.x + E.y * E.y) > .0081)
            st=3; // too fast
        else if (Q(tv.y) > .1)
            st=4; // not level
        else a = 0, L = P(O,1), st=1;

        // I explosion.
        g=[];
        h=[];

        for (i=0;i<20;i++)
            _ = U(),
            g.push({ p: P(O), v: P(V(B(_),G(_)), .1+R(.4)) });

        T=120;
    }

    // draw craft if not dead
    if (st < 2)
    {
        if (k[190] && f)
            K='red',
            l(s[0], s[3]),
            l(s[3], s[1]);

        K='cyan';
        l(s[0], s[1]);
        l(s[1], s[2]);
        l(s[2], s[0]);
    }
    else for (_ of g) K='red',
            l(_.p, A(_.p, _.v)),
            _.p = A(_.p, P(_.v,1/6));

    T && !--T && I();

    requestAnimationFrame(N);
};

I();
N();
