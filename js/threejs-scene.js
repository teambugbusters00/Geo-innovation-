// Advanced Three.js Scene with Industrial Theme
class ThreeScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }

    init() {
        this.setupRenderer();
        this.createParticles();
        this.createIndustrialElements();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.getElementById('three-container').appendChild(this.renderer.domElement);
        
        this.camera.position.z = 50;
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count * 3; i += 3) {
            // Positions in a sphere
            const radius = 50 + Math.random() * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
            
            // Industrial colors (steel blue, orange heat, green efficiency)
            const colorChoice = Math.random();
            if (colorChoice < 0.6) {
                // Steel blue
                colors[i] = 0.3 + Math.random() * 0.2;
                colors[i + 1] = 0.4 + Math.random() * 0.3;
                colors[i + 2] = 0.8 + Math.random() * 0.2;
            } else if (colorChoice < 0.8) {
                // Heat orange
                colors[i] = 0.8 + Math.random() * 0.2;
                colors[i + 1] = 0.4 + Math.random() * 0.3;
                colors[i + 2] = 0.1 + Math.random() * 0.2;
            } else {
                // Efficiency green
                colors[i] = 0.1 + Math.random() * 0.2;
                colors[i + 1] = 0.7 + Math.random() * 0.3;
                colors[i + 2] = 0.3 + Math.random() * 0.2;
            }
            
            sizes[i / 3] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createIndustrialElements() {
        // Create some industrial-looking geometric shapes
        const group = new THREE.Group();
        
        // Factory-like structures
        const factoryGeometry = new THREE.BoxGeometry(10, 20, 10);
        const factoryMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x334155,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        
        for (let i = 0; i < 5; i++) {
            const factory = new THREE.Mesh(factoryGeometry, factoryMaterial);
            factory.position.x = (Math.random() - 0.5) * 100;
            factory.position.y = (Math.random() - 0.5) * 100;
            factory.position.z = (Math.random() - 0.5) * 100;
            factory.rotation.x = Math.random() * Math.PI;
            factory.rotation.y = Math.random() * Math.PI;
            group.add(factory);
        }
        
        this.scene.add(group);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x4facfe, 0.8, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
    }

    setupEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX - window.innerWidth / 2) * 0.0001;
            this.mouseY = (event.clientY - window.innerHeight / 2) * 0.0001;
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
            
            // Mouse interaction
            this.particles.rotation.x += this.mouseY;
            this.particles.rotation.y += this.mouseX;
            
            // Pulsating effect
            const time = Date.now() * 0.001;
            this.particles.material.opacity = 0.6 + Math.sin(time) * 0.2;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
});