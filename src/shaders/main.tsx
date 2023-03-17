export default `
uniform vec3 uResolution;
uniform sampler2D uChannel0;

void main() {
    // Setup UV coordinates
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // Get paint buffer
    vec4 buffer = texture(uChannel0, uv);
    float map = buffer.x;
    
    // Gradient normal from gray value
    float range = 3.;
    vec3 unit = vec3(range/uResolution.xy, 0);
    vec3 normal = normalize(vec3(
        texture(uChannel0, uv + unit.xz).r-texture(uChannel0, uv - unit.xz).r,
        texture(uChannel0, uv - unit.zy).r-texture(uChannel0, uv + unit.zy).r,
        map*map));
        
    // Backlight
    vec3 color = vec3(.5)*(.6-abs(dot(normal, vec3(.8, .4, 1.5))));
    
    // Highlight
    vec3 dir = normalize(vec3(3, 2, 3));
    float highlight = pow(dot(normal, dir)*.5+1.5, 5.);
    color += vec3(.5)*smoothstep(.5, 1., highlight);
    
    // Rainbow
    vec3 tint = .4+.6*cos(vec3(0,2,3)+dot(normal, dir)*2.-uv.y*3.-3.);
    color += tint * smoothstep(1.2, .3, map);
    
    // Background blend
    vec3 background = vec3(.97, .97, .97);
    background *= smoothstep(4., 0., length(uv-0.5));
    color = mix(background, clamp(color, 0., 1.), smoothstep(0., 1., map));
    
    gl_FragColor = vec4(color, 1);
}
`;
