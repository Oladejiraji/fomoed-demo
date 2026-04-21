// precision mediump float;

uniform sampler2D uTexture;
uniform float uOffset;
uniform float uTime;
uniform float uOpacity;
uniform float uTextureSpeed;
uniform float uIsLoading;
uniform float uIsLoadingOpacity;

varying vec2 vUv;
// varying vec2 relativeUv;

vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
  float rs = s.x / s.y; // Aspect screen size
  float ri = i.x / i.y; // Aspect image size
  vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
  vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
  return u * s / st + o;
}

vec3 loadingColorA = vec3(0.0);
vec3 loadingColorB = vec3(0.019382360952473074);

void main() {

  vec2 uv = vUv;
  // gl_FragColor = vec4(relativeTex, 1.0);
  float y = smoothstep(0.1, 0.9, vUv.y);
  vec3 color = mix(loadingColorA, loadingColorB, y);

  uv.x += uTime * uTextureSpeed;
  vec4 tex = texture2D(uTexture, uv);

  vec3 finalColor = mix(color, tex.rgb, uIsLoading);
  float finalOpacity = mix(uIsLoadingOpacity, uOpacity, uIsLoading);

  gl_FragColor = vec4(color, uOpacity);
  // gl_FragColor = vec4(tex.rgb, uOpacity);
  // gl_FragColor = vec4(vec3(uv, 1.0), 1.0);
  gl_FragColor = vec4(finalColor, finalOpacity);
  // #include <tonemapping_fragment>
	// #include <colorspace_fragment>
}
