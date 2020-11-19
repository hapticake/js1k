p = []
for (var i = -1; ++i < 72;) {
    p.push(Math.pow(Math.cbrt(Math.sqrt(Math.sqrt(2))), i) * 27.5);
}
var ctx = new AudioContext();
var o = ctx.createOscillator();
var real = new Float32Array(2);
var imag = new Float32Array(2);
real[0] = 0;
imag[0] = 0;
real[1] = 0.1;
imag[1] = 0;
var wave = ctx.createPeriodicWave(real, imag, {disableNormalization: true});
v = [
    7, 4,
    6, 4,
    7, 4, //
    6, 4,
    7, 4,
    2, 4,
    5, 4,
    3, 4,
    0, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 3,
    0, 4,
    2, 4, //
    7, 2,
    11, 2,
    7, 3,
    11, 3,
    2, 4,
    3, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 4,
    6, 4,
    7, 4, //
    6, 4,
    7, 4,
    2, 4,
    5, 4,
    3, 4,
    0, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 3,
    0, 4,
    2, 4, //
    7, 2,
    11, 2,
    7, 3,
    3, 4,
    2, 4,
    0, 4, //
    7, 2,
    0, 3,
    2, 4,
    3, 4,
    5, 4,
    7, 4, //
    10, 2,
    3, 3,
    10, 3,
    8, 4,
    7, 4,
    5, 4, //
    10, 2,
    2, 3,
    8, 3,
    7, 4,
    5, 4,
    3, 4, //
    7, 2,
    0, 3,
    7, 3,
    5, 4,
    3, 4,
    2, 4, //
    7, 2,
    7, 3,
    7, 3,
    7, 4,
    7, 3,
    7, 4, //
    7, 4,
    7, 5,
    6, 4,
    7, 4,
    6, 4,
    7, 4, //
    6, 4,
    7, 4,
    6, 4,
    7, 4,
    6, 4,
    7, 4, //
    6, 4,
    7, 4,
    2, 4,
    5, 4,
    3, 4,
    0, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 3,
    0, 4,
    2, 4, //
    7, 2,
    11, 2,
    7, 3,
    11, 3,
    2, 4,
    3, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 4,
    6, 4,
    7, 4, //
    6, 4,
    7, 4,
    2, 4,
    5, 4,
    3, 4,
    0, 4, //
    7, 2,
    0, 3,
    3, 3,
    7, 3,
    0, 4,
    2, 4, //
    7, 2,
    11, 2,
    7, 3,
    3, 4,
    2, 4,
    0, 4, //
    0, 0,
    0, 0,
    0, 0
];
function f(n, v, t) {
    o.frequency.setValueAtTime(p[n + v * 12], ctx.currentTime + t);
}
for (var j = 0; j < 10; ++j) {
    for (var i = 0; i < v.length; i += 2) {
        f(v[i], v[i + 1], (i + j * v.length) / 7);
    }
}
o.setPeriodicWave(wave);
o.connect(ctx.destination);
o.start();