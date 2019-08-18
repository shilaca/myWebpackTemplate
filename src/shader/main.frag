precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;


void main(void) {
  vec2 p = (gl_FragCoord.xy, * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  vec2 color = (vec2(1.) + p.xy) * .5;
  gl_FragColor = vec4(color, .0, 1.);
}
