import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef();
  const rendererRef = useRef(null);
  const pointersRef = useRef(null);

  // WebGL Renderer class
  class WebGLRenderer {
    constructor(canvas, scale) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2');
      this.program = null;
      this.vs = null;
      this.fs = null;
      this.buffer = null;
      this.mouseMove = [0, 0];
      this.mouseCoords = [0, 0];
      this.pointerCoords = [0, 0];
      this.nbrOfPointers = 0;

      this.vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

      this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
      this.shaderSource = defaultShaderSource;
      
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    }

    updateShader(source) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas) {
      this.mouseMove = deltas;
    }

    updateMouse(coords) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader, source) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER);
      this.fs = gl.createShader(gl.FRAGMENT_SHADER);
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram();
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      program.resolution = gl.getUniformLocation(program, 'resolution');
      program.time = gl.getUniformLocation(program, 'time');
      program.move = gl.getUniformLocation(program, 'move');
      program.touch = gl.getUniformLocation(program, 'touch');
      program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
      program.pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(program.time, now * 1e-3);
      gl.uniform2f(program.move, ...this.mouseMove);
      gl.uniform2f(program.touch, ...this.mouseCoords);
      gl.uniform1i(program.pointerCount, this.nbrOfPointers);
      gl.uniform2fv(program.pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    constructor(element, scale) {
      this.scale = scale;
      this.active = false;
      this.pointers = new Map();
      this.lastCoords = [0, 0];
      this.moves = [0, 0];
      
      const map = (element, scale, x, y) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  return canvasRef;
};

// Custom Text Loop Component with smooth animations - Fixed container to prevent layout shift
const AnimatedText = () => {
  const words = ['Precision', 'Intelligence', 'Clarity', 'Nova'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  const isNova = words[index] === 'Nova';

  return (
    <div 
      className="relative inline-flex items-center justify-center w-full"
      style={{ 
        minHeight: 'clamp(60px, 12vw, 120px)', 
        minWidth: '280px'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className={`absolute whitespace-nowrap ${
            isNova
              ? 'text-white font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
              : 'text-white font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
          }`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// Scroll Down Indicator - Simple Chevron Only
const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className="sm:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      onClick={scrollToContent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <ChevronDown className="text-orange-400/70 w-8 h-8" />
      </motion.div>
    </motion.div>
  );
};

// Reusable Hero Component
const Hero = ({
  headline,
  subtitle,
  buttons,
  className = ""
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: 'black' }}
      />
      
      {/* Dark gradient overlay for improved legibility */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4">
        <div className="text-center space-y-4 md:space-y-6 max-w-5xl mx-auto w-full">
          {/* Main Heading with Animated Text - Centered and Responsive */}
          <div className="space-y-1 md:space-y-2">
            <h1 className="font-bold leading-tight">
              <AnimatedText />
              <span className="block mt-1 text-5xl sm:text-6xl md:text-8xl lg:text-8xl bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Engineered.
              </span>
            </h1>
          </div>
          
          {/* Subtitle - Clean without backdrop, better text shadows for readability */}
          <div className="max-w-3xl mx-auto mt-6 md:mt-8">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed px-4 font-inter" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)' }}>
              <span className="text-orange-200 font-medium">AI systems</span> that{' '}
              <span className="text-yellow-300 font-medium">speak with clarity</span>,{' '}
              <span className="text-orange-200 font-medium">reason</span> with{' '}
              <span className="text-yellow-300 font-medium">precision</span>, and{' '}
              <span className="text-orange-200 font-medium">evolve</span> with{' '}
              <span className="text-yellow-300 font-medium">purpose</span>.
              <br />
              <span className="text-orange-300/90 text-sm sm:text-base md:text-lg mt-2 inline-block font-normal">
                Design-driven engineering studio • Lahore → Global
              </span>
            </p>
          </div>
          
          {/* CTA Buttons (hidden on mobile) */}
          {buttons && (
            <div className="hidden sm:flex gap-4 justify-center mt-10 px-4">
              {buttons.primary && (
                <motion.button
                  onClick={buttons.primary.onClick}
                  className="bg-nova-primary hover:bg-nova-primary-dark text-black px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-[4px] transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 10px 40px rgba(251, 191, 36, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {buttons.primary.text}
                </motion.button>
              )}
              {buttons.secondary && (
                <motion.button
                  onClick={buttons.secondary.onClick}
                  className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-[4px] hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 10px 40px rgba(251, 191, 36, 0.25)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {buttons.secondary.text}
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator removed as requested */}
    </div>
  );
};

const defaultShaderSource = `#version 300 es
/*********
* Modified shader with more spread out flares
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
  float t=.0, a=1.; 
  mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}

void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	
	// Increased spread - changed from 1.-.3 to 1.-.6 for more distribution
	uv*=1.-.6*(sin(T*.2)*.5+.5);
	
	// Reduced iterations from 12 to 8 for less crowded flares
	for (float i=1.; i<8.; i++) {
		// Increased spread multiplier from .1 to .25 for wider distribution
		uv+=.25*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		
		// Slightly reduced intensity for softer flares
		col+=.001/d*(cos(sin(i)*vec3(1,2,3))+1.);
		float b=noise(i+p+bg*1.731);
		col+=.0015*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
	}
	O=vec4(col,1);
}`;

export default Hero;
