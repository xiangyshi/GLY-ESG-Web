<template>
    <div ref="globeContainer" class="globe-container">
        <div class="info-container">
            <h1>Additional Information</h1>
            <p>This is some text displayed on top of the globe.</p>
            <button @click="handleClick">Click Me!</button>
        </div>
    </div>
    
</template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: "RotatingGlobe",
    mounted() {
      this.initGlobe();
      window.addEventListener('resize', this.onWindowResize, false);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
      initGlobe() {
        console.log('Initializing globe'); // Debugging log
        // Setup the scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000013);
        this.$refs.globeContainer.appendChild(this.renderer.domElement);
  

        // Create the gradient background using ShaderMaterial
        const vertexShader = `
            varying vec2 vUv;
            void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const fragmentShader = `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            void main() {
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
            }
        `;

        const uniforms = {
            color1: { value: new THREE.Color(0x00007f) },  // Dark blue
            color2: { value: new THREE.Color(0x000000) }   
        };

        const backgroundMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: uniforms,
            side: THREE.BackSide
        });
        const backgroundGeometry = new THREE.SphereGeometry(40, 32, 32); // Large sphere to wrap the scene
        const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        backgroundMesh.position.set(0, 0, 20);
        backgroundGeometry.rotateZ(89.6);
        backgroundGeometry.rotateY(46.15);
        this.scene.add(backgroundMesh);
        

        // Create the globe (a sphere with night texture)
        const geometry = new THREE.SphereGeometry(10, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        
        // Replace this with the actual path to your downloaded night texture
        const nightTexture = textureLoader.load('assets/dark-globe.gif'); 
        const material = new THREE.MeshBasicMaterial({ map: nightTexture });

        nightTexture.minFilter = THREE.LinearFilter; // or THREE.NearestFilter
        nightTexture.magFilter = THREE.LinearFilter; // or THREE.NearestFilter
        

        this.globe = new THREE.Mesh(geometry, material);
        this.scene.add(this.globe);
        this.globe.position.set(-24, 0, -15);
        this.globe.scale.set(1, 1.2, 1);
  
        // Position the camera
        this.camera.position.z = 18;

        // Start the animation loop
        this.animate();
      },
      animate() {
        requestAnimationFrame(this.animate);
  
        // Rotate the globe
        this.globe.rotation.y += 0.001;
  
        this.renderer.render(this.scene, this.camera);
      },
      onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  };
  </script>
  
<style scoped>
.globe-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    background: radial-gradient(circle at 25% 50%, #1a2a6c, #b21f1f, #fdbb2d);
    z-index: -1; /* Ensure it's behind the globe */
}

.info-container {
    position: absolute;
    top: 50%; /* Adjust as needed for vertical positioning */
    right: 20%; /* Adjust this value to move the container from the right edge */
    background: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 1; /* Ensure it's above the canvas */
}
</style>
  