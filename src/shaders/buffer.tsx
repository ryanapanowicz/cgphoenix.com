export default `
uniform vec3 uResolution;
uniform float uTime;
uniform vec4 uMouse;
uniform float uTimeDelta;
uniform sampler2D uChannel0;

const float fade = .2;
const float strength = 1.;
const float range = 5.;
const float size = .04;
const float scale = .35;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm(in vec2 st) {
    float v = 0.;
    float a = .6;
    
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));
    for (int i = 0; i < 6; ++i) {
        v += a * noise(st);
        st = rot * st * 8.0;
        a *= 0.6;
    }
    return v;
}

vec2 leminiscate(in float t){
    float x = scale * cos(t) / (1.0 + sin(t) * sin(t));
    float y = scale * sin(t) * cos(t) / (1.0 + sin(t) * sin(t));
    return vec2(x, y);
}

void main() {
    // Center UV coordinates
    vec2 uv = (gl_FragCoord.xy - uResolution.xy / 2.) / uResolution.x;
    
    // Noise
    float turbulence = fbm(uv*20.0+uTime);
    
    // Set paint position
    vec2 position = vec2(0.);

    // Set next paint position
    vec2 positionN = vec2(0.);
    
    // Paint from mouse motion
    if (uMouse.z > .5) {
        position = (uMouse.xy - uResolution.xy / 2.) / uResolution.x;
    } else {
        position -= leminiscate(uTime);
    }
    
    // Move uv to position
    uv -= position;

    // Paint on canvas
    float paint = smoothstep(clamp(size*abs(cos(uTime)), size*.5, size), .0, length(uv))*2.;

    // Paint bleed
    vec2 offset = vec2(0., .5);
    uv = gl_FragCoord.xy / uResolution.xy;
    vec4 data = texture(uChannel0, uv);
    vec3 unit = vec3(range/uResolution.xy,0);
    vec3 normal = normalize(vec3(
        texture(uChannel0, uv - unit.xz).r-texture(uChannel0, uv + unit.xz).r,
        texture(uChannel0, uv - unit.zy).r-texture(uChannel0, uv + unit.zy).r,
        data.x*data.y));
    offset -= normal.xy;

    // Turbulence
    offset *= vec2(turbulence);
    offset *= 2.8;

    // Sample buffer
    vec4 frame = texture(uChannel0, uv + strength * offset / uResolution.xy);
    
    // Temporal fading buffer
    paint = mix(paint, 1., frame.x - uTimeDelta * fade);

    // Output to screen
    gl_FragColor = vec4(clamp(paint, 0., 1.));
}
`;
