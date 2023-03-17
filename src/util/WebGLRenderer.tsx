import * as THREE from "three";

export interface options {
    element: HTMLElement | null;
    width?: number;
    height?: number;
    mainShader: BufferShader;
    bufferShaders?: BufferShader[];
}

export class CanvasRequired extends Error {}
export class MissingShader extends Error {}
export class WebGL2NotAvailable extends Error {}

export class BufferShader {
    public uniforms: { [key: string]: { value: any } } = {};
    public readBuffer: THREE.WebGLRenderTarget;
    public writeBuffer: THREE.WebGLRenderTarget;
    public material: THREE.ShaderMaterial;
    public scene: THREE.Scene;

    constructor(public fragmentShader: string) {
        this.material = new THREE.ShaderMaterial({
            fragmentShader,
            uniforms: this.uniforms,
        });

        this.scene = new THREE.Scene();
        this.scene.add(
            new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), this.material)
        );

        this.readBuffer = new THREE.WebGLRenderTarget(1024, 800, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            stencilBuffer: false,
        });

        this.writeBuffer = this.readBuffer.clone();
    }

    public setUniforms(uniforms: { [key: string]: any }) {
        Object.assign(this.uniforms, uniforms);
    }

    public swap() {
        const temp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = temp;
    }

    public render(
        renderer: THREE.WebGLRenderer,
        camera: THREE.Camera,
        screen: boolean = false
    ) {
        if (screen) {
            renderer.render(this.scene, camera);
        } else {
            this.writeBuffer.setSize(
                renderer.domElement.width,
                renderer.domElement.height
            );

            renderer.setRenderTarget(this.writeBuffer);
            renderer.render(this.scene, camera);
            renderer.setRenderTarget(null);
        }
        this.swap();
    }
}

export default class WebGLRenderer {
    private mousePosition = new THREE.Vector4();
    private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    private clock = new THREE.Clock();
    private renderer: THREE.WebGLRenderer | undefined;
    private reunderId: number | undefined;
    private config: any;
    private resolution: THREE.Vector3 | undefined;
    private interval = 1 / 60;
    private delta = 0;

    private defaults = {
        element: undefined,
        width: 1024,
        height: 800,
        mainShader: undefined,
        bufferShaders: undefined,
    };

    constructor(options: options) {
        this.config = { ...this.defaults, ...options };

        // Throw error if no main element set
        if (!(this.config.element instanceof Element)) {
            throw new CanvasRequired(
                "Element is required to attached WebGL canvas."
            );
        }

        // Throw error if no main shader set
        if (!(this.config.mainShader instanceof BufferShader)) {
            throw new MissingShader("MainShader is required.");
        }

        // Render fallback or throw error if WebGL2 is not supported
        if (!this.isWebGL2Available()) {
            throw new WebGL2NotAvailable("Browser does not support WebGL2.");
        }

        const canvas = this.config.element.getElementsByTagName("canvas");
        let rendererSettings: THREE.WebGLRendererParameters = {
            antialias: false,
        };

        if (canvas.length > 0) {
            rendererSettings.canvas = canvas[0];
        }

        // Create renderer
        this.renderer = new THREE.WebGLRenderer(rendererSettings);

        // Setup Three.js renderer
        this.resolution = new THREE.Vector3(
            this.config.width,
            this.config.height,
            window.devicePixelRatio
        );

        // Set renderer size
        this.renderer.setSize(this.config.width, this.config.height, false);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        if (this.config.bufferShaders) {
            for (const buffer of this.config.bufferShaders) {
                buffer.setUniforms({
                    uResolution: { value: this.resolution },
                    uTime: { value: 0 },
                    uTimeDelta: { value: 0 },
                    uMouse: { value: this.mousePosition },
                });
            }
        }

        // Set initial uniform values
        this.config.mainShader.setUniforms({
            uResolution: { value: this.resolution },
            uTime: { value: 0 },
            uTimeDelta: { value: 0 },
            uMouse: { value: this.mousePosition },
        });

        this.config.element.append(this.renderer.domElement);

        this.animate(this.clock.elapsedTime);
    }

    public mousedown(x: number, y: number) {
        if (this.mousePosition.z <= 0 && this.renderer) {
            this.mousePosition.setZ(x);
            this.mousePosition.setW(this.renderer.domElement.height - y);
        }
    }

    public mouseup() {
        this.mousePosition.setZ(0);
        this.mousePosition.setW(0);
    }

    public mousemove(x: number, y: number) {
        if (this.renderer) {
            this.mousePosition.setX(x);
            this.mousePosition.setY(this.renderer.domElement.height - y);
        }
    }

    public resize(width: number, height: number) {
        this.renderer?.setSize(width, height, false);
    }

    public destroy() {
        // Cancel three.js requestAnimationFrame or it will never stop.
        if (this.reunderId) {
            cancelAnimationFrame(this.reunderId);
        }
    }

    private isWebGL2Available() {
        try {
            const canvas = document.createElement("canvas");
            return !!(
                window.WebGL2RenderingContext && canvas.getContext("webgl2")
            );
        } catch (e) {
            return false;
        }
    }

    private animate(time: number) {
        this.reunderId = requestAnimationFrame((time) => {
            if (this.delta > this.interval) {
                time *= 0.001; // convert to seconds

                if (this.config.bufferShaders) {
                    for (const buffer of this.config.bufferShaders) {
                        buffer.uniforms.uTime.value = time;
                        buffer.uniforms.uTimeDelta.value = this.delta;
                        buffer.uniforms.uResolution.value.set(
                            this.renderer?.domElement.width,
                            this.renderer?.domElement.height,
                            window.devicePixelRatio
                        );

                        buffer.render(this.renderer, this.camera);
                    }

                    // Add render target textures available to all buffers
                    for (const index in this.config.bufferShaders) {
                        const buffer = this.config.bufferShaders[index];
                        const texture = buffer.readBuffer.texture;

                        buffer.setUniforms({
                            [`uChannel${index}`]: { value: texture },
                        });
                        this.config.mainShader.setUniforms({
                            [`uChannel${index}`]: { value: texture },
                        });
                    }
                }

                this.config.mainShader.uniforms.uTime.value = time;
                this.config.mainShader.uniforms.uTimeDelta.value = this.delta;
                this.config.mainShader.uniforms.uResolution.value.set(
                    this.renderer?.domElement.width,
                    this.renderer?.domElement.height,
                    window.devicePixelRatio
                );

                this.config.mainShader.render(this.renderer, this.camera, true);

                // The draw or time dependent code are here
                this.delta %= this.interval;
            }

            this.animate(this.clock.elapsedTime);
        });

        this.delta += this.clock.getDelta();
    }
}
