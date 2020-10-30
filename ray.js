// A simple and small raytracer, shooting 320x200x2 rays.
// One unit cube at origin, one plane below it at y=-0.5, and one light.
// Stops at one hit, and then calculates shading.
//
// The camera and light can be moved by tapping the canvas along its width.
// 
// Some inspiration from here:
// 
//     https://github.com/tmcw/literate-raytracer/blob/gh-pages/src/index.js
//     https://js1k.com/2017-magic/demo/2648

M=Math;
I=M.min;
O=M.max;
B=M.sin;
G=M.cos;

// vec
V=(x=0,y=x,z=y)=>({x,y,z});
// dotproduct
D=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z;
// cross
X=(a,b)=>V(a.y*b.z-a.z*b.y,a.z*b.x-a.x*b.z,a.x*b.y-a.y*b.x);
// subtract
S=(a,b)=>V(a.x-b.x,a.y-b.y,a.z-b.z);
// multiply
Q=(a,t)=>V(a.x*t,a.y*t,a.z*t);
// add
A=(a,b)=>V(a.x+b.x,a.y+b.y,a.z+b.z);
// unitvector 
U=a=>Q(a,1/vl(a));
// length
vl=a=>M.sqrt(D(a,a));
// light and cam angles
q=[.7,6];

W=a.width=320;
H=a.height=200;

a.onclick=e=>{
    _=e.offsetX/160>>0;
    q[_>>1] += _%2*.2-.1;
    m()
}

// main
m=()=>{
    // cube at origin, and bounds -0.5 -> 0.5
    // C = { b:{a:V(-.5), b:V(.5)} }
    p = V(B(q[0])*5,3,G(q[0])*5);
    L = V(B(q[1])*20,20,G(q[1])*20);

    // camera look at cube (origin), setup unit vectors for forward, right and up.
    // forward is the line from camera pos to cube (origin)
    // right   is found using rhr and cross with global up
    // up      is orthogonal to f and r
    f = U(S(V(), p));
    r = U(X(f, V(0,1,0)));
    u = X(r, f);

    da = c.getImageData(0,0,W,H);

    // for each pixel, shoot a ray
    i=0;
    for (y = 0; y < H; y++)
        for (x = 0; x < W; x++, i+=4)
            // compute the deflection of each ray
            // constants are calculated from fov 45 and pix dims of W,H
            // See https://github.com/tmcw/literate-raytracer/blob/gh-pages/src/index.js#L191
            // for formulas.
            xc = Q(r,  x * .0026 - .414),
            yc = Q(u, -y * .0026 + .26),
            v=U(A(A(f,xc),yc)),

            // default color is white (hit nothing) - not needed in demos, because all rays hit something
            // s = V(255)

            // ix(p,v) - computes the ray distance and normal 
            //
            // normally, the next two lines would need this conditional
            // if (u = ix(p,v))
            h = A(p, Q(v, ix(p,v))),   // compute cube hitpoint and normal
            s = sf(h, N),                // get surface color at hitpoint with cube normal

            // set pixel color based on surface returned
            da.data.set([s.x,s.y,s.z,255],i);

    // blit texture
    c.putImageData(da, 0, 0)
}

// get surface color for hitpoint and normal
sf=(h,n)=>{

    // map normal to color space to give things some color
    b = Q(A(n,V(1)),127);
    l = 0;

    // if light is visible from the hitpoint, then calculate the lambert diffuse
    // shading for the point based on the normal.
    if (vi(h))
        _=D(U(S(L, h)), n),
        l += _*(_>0);

    // prevent blowout from lambert shading (not really needed for demo)
    // l = I(1, l)
    // return combination of lambert and ambient.
    return A(Q(b,l*.7),Q(b,.3))
}

// determine if light visible from pt by shooting a ray
// from the light and testing the distance.
// We shoot from light to h to avoid bias calc.
vi=(pt)=>{

    if (u2 = ix(L, U(S(pt,L))))
        return u2 > (vl(S(pt,L)) - .01)
}

// intersect unit cube at origin or plane at y=-.5
ix=(p,v)=>{
    a = V(-.5);
    z = V(.5);
    d = V(1 / v.x, 1 / v.y, 1 / v.z);

    t1 = (a.x - p.x)*d.x;
    t2 = (z.x - p.x)*d.x;
    t3 = (a.y - p.y)*d.y;
    t4 = (z.y - p.y)*d.y;
    t5 = (a.z - p.z)*d.z;
    t6 = (z.z - p.z)*d.z;

    t =  O(I(t1,t2), I(t3,t4), I(t5,t6));
    tx = I(O(t1,t2), O(t3,t4), O(t5,t6));

    // compute normal of hit face. maps 0,1,2,3,4,5 to  (-1,0,0), (1,0,0), (0,-1,0) ...
    N=V();
    _=[t1,t2,t3,t4,t5,t6].indexOf(t);
    N['xyz'[_>>1]] = _%2*2-1;

    // If box not hit, then test the plane instead
    if (tx < 0 || t > tx)
        t = (-.5 - p.y) * d.y,
        N = V(.7);                   // give plane a funny normal to make it grey and have a bit of shimmer

    // if t is negative, then nothing was hit (ray into sky)
    if (t>0)
        return t
}

m()
