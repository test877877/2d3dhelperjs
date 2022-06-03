// noinspection JSUnusedLocalSymbols

(async () => {
    let _resolve;
    window.ENGINE = {
        init: new Promise(resolve => _resolve = resolve)
    };
    const loadScript = (src, async = true) => new Promise(r => {
        const element = document.createElement("script");
        element.setAttribute("src", src);
        element.setAttribute("type", "text/javascript");
        element.setAttribute("async", async.toString());
        document.body.appendChild(element);
        element.addEventListener("load", () => r({success: true}));
        element.addEventListener("error", ev => r({error: ev}));
    });
    const loadImage = src => new Promise(r => {
        const image = new Image(src);
        image.onload = () => r(true);
        image.onerror = () => r(false);
    });
    const libraries = {
        AmmoJS: () => window["Ammo"],
        MatterJS: () => window.Matter,
        ThreeJS: () => window.THREE
    };

    function Vector2(x, y) {
        /*** @type {number} */
        this.x = x;
        /*** @type {number} */
        this.y = y;

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.add = (x, y) => {
            if (x instanceof Vector2) {
                this.x += x.x;
                this.y += x.y;
            } else {
                this.x += x;
                this.y += y;
            }
            return this;
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.sub = (x, y) => {
            if (x instanceof Vector2) {
                this.x -= x.x;
                this.y -= x.y;
            } else {
                this.x -= x;
                this.y -= y;
            }
            return this;
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.mul = (x, y) => {
            if (x instanceof Vector2) {
                this.x *= x.x;
                this.y *= x.y;
            } else {
                this.x *= x;
                this.y *= y;
            }
            return this;
        };

        /**
         * @param {number | Vector2} n
         * @return {Vector2}
         */
        this.mulScalar = n => {
            this.x *= n;
            this.y *= n;
            return this;
        }

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.div = (x, y) => {
            if (x instanceof Vector2) {
                this.x /= x.x;
                this.y /= x.y;
            } else {
                this.x /= x;
                this.y /= y;
            }
            return this;
        };

        /**
         * @param {number | Vector2} n
         * @return {Vector2}
         */
        this.divScalar = (n) => {
            this.x /= n;
            this.y /= n;
            return this;
        }

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.set = (x, y) => {
            if (x instanceof Vector2) {
                this.x = x.x;
                this.y = x.y;
            } else {
                this.x = x;
                this.y = y;
            }
            return this;
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.copy = (x, y) => new Vector2(this.x, this.y);

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {number}
         */
        this.distance = (x, y) => {
            if (x instanceof Vector2) return Math.hypot(this.x - x.x, this.y - x.y);
            else return Math.hypot(this.x - x, this.y - y);
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {number}
         */
        this.distanceSq = (x, y) => {
            if (x instanceof Vector2) return Math.pow(this.x - x.x, 2) + Math.pow(this.y - x.y, 2);
            else return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2);
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {number}
         */
        this.getRadians = (x, y) => {
            if (x instanceof Vector2) return Math.atan2(this.y - x.y, this.x - x.x);
            else return Math.atan2(this.y - y, this.x - x);
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {number}
         */
        this.getDegrees = (x, y) => {
            if (x instanceof Vector2) return this.getRadians(x) * 180 / Math.PI;
            else return this.getRadians(x, y) * 180 / Math.PI;
        };

        /**
         * @param {number | Vector2} x
         * @param {number?} y
         * @return {Vector2}
         */
        this.normalize = (x, y) => {
            if (x instanceof Vector2) {
                const len = this.distance(x);
                this.x = (x.x - this.x) / len;
                this.y = (x.y - this.y) / len;
            } else {
                const len = this.distance(x, y);
                this.x = (x - this.x) / len;
                this.y = (y - this.y) / len;
            }
            return this;
        };

        /**
         * @param {number} radians
         * @return {Vector2}
         */
        this.directByRadians = (radians) => {
            this.x = Math.cos(radians);
            this.y = Math.sin(radians);
            return this;
        }

        /**
         * @param {number} degrees
         * @return {Vector2}
         */
        this.directByDegrees = (degrees) => {
            this.x = Math.cos(degrees * Math.PI / 180);
            this.y = Math.sin(degrees * Math.PI / 180);
            return this;
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @constructor
     */
    function Vector3(x, y, z) {
        /*** @type {number} */
        this.x = x;
        /*** @type {number} */
        this.y = y;
        /*** @type {number} */
        this.z = z;

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.add = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x += x.x;
                this.y += x.y;
                this.z += x.z;
            } else {
                this.x += x;
                this.y += y;
                this.z += z;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.sub = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x -= x.x;
                this.y -= x.y;
                this.z -= x.z;
            } else {
                this.x -= x;
                this.y -= y;
                this.z -= z;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.mul = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x *= x.x;
                this.y *= x.y;
                this.z *= x.z;
            } else {
                this.x *= x;
                this.y *= y;
                this.z *= z;
            }
            return this;
        };

        /**
         * @param {number} n
         * @return {Vector3}
         */
        this.mulScalar = n => {
            this.x *= n;
            this.y *= n;
            this.z *= n;
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.div = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x /= x.x;
                this.y /= x.y;
                this.z /= x.z;
            } else {
                this.x /= x;
                this.y /= y;
                this.z /= z;
            }
            return this;
        };

        /**
         * @param {number} n
         * @return {Vector3}
         */
        this.divScalar = n => {
            this.x /= n;
            this.y /= n;
            this.z /= n;
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.copy = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            } else {
                this.x = x;
                this.y = y;
                this.z = z;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {number}
         */
        this.distance = (x, y, z) => {
            if (x instanceof Vector3) return Math.sqrt(Math.pow(this.x - x.x, 2) + Math.pow(this.y - x.y, 2) + Math.pow(this.z - x.z, 2));
            else return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) + Math.pow(this.z - z, 2));
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {number}
         */
        this.dot = (x, y, z) => {
            if (x instanceof Vector3) return this.x * x.x + this.y * x.y + this.z * x.z;
            else return this.x * x + this.y * y + this.z * z;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.cross = (x, y, z) => {
            if (x instanceof Vector3) {
                let x1 = this.x, y1 = this.y, z1 = this.z;
                this.x = y1 * x.z - z1 * x.y;
                this.y = z1 * x.x - x1 * x.z;
                this.z = x1 * x.y - y1 * x.x;
            } else {
                let x1 = this.x, y1 = this.y, z1 = this.z;
                this.x = y1 * z - z1 * y;
                this.y = z1 * x - x1 * z;
                this.z = x1 * y - y1 * x;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.normalize = (x, y, z) => {
            if (x instanceof Vector3) {
                let l = Math.sqrt(Math.pow(x.x, 2) + Math.pow(x.y, 2) + Math.pow(x.z, 2));
                this.x = x.x / l;
                this.y = x.y / l;
                this.z = x.z / l;
            } else {
                let l = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                this.x = x / l;
                this.y = y / l;
                this.z = z / l;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.negate = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x = -x.x;
                this.y = -x.y;
                this.z = -x.z;
            } else {
                this.x = -x;
                this.y = -y;
                this.z = -z;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.lerp = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x += (x.x - this.x) * x.x;
                this.y += (x.y - this.y) * x.y;
                this.z += (x.z - this.z) * x.z;
            } else {
                this.x += (x - this.x) * x;
                this.y += (y - this.y) * y;
                this.z += (z - this.z) * z;
            }
            return this;
        };

        /**
         * @param {number | Vector3} x
         * @param {number?} y
         * @param {number?} z
         * @return {Vector3}
         */
        this.clamp = (x, y, z) => {
            if (x instanceof Vector3) {
                this.x = Math.min(Math.max(this.x, x.x), x.x);
                this.y = Math.min(Math.max(this.y, x.y), x.y);
                this.z = Math.min(Math.max(this.z, x.z), x.z);
            } else {
                this.x = Math.min(Math.max(this.x, x), x);
                this.y = Math.min(Math.max(this.y, y), y);
                this.z = Math.min(Math.max(this.z, z), z);
            }
            return this;
        }
    }

    async function TwoDimensionEngine({loadPhysics = true} = {}) {
        if (loadPhysics && !libraries.MatterJS()) {
            const result = await loadScript("https://unpkg.com/matter-js/build/matter.min.js");
            if (result.error) alert("Failed to load MatterJS");
        }

        function Scene({
                           canvas = null,
                           background = "#14151f",
                           width = 800,
                           height = 600,
                           pixelRatio = 1,
                           wireframeBackground = "#14151f",
                           wireframes = false,
                           showSleeping = true,
                           showDebug = false,
                           showStats = false,
                           showPerformance = false,
                           showBounds = false,
                           showVelocity = false,
                           showCollisions = false,
                           showSeparations = false,
                           showAxes = false,
                           showPositions = false,
                           showAngleIndicator = false,
                           showIds = false,
                           showVertexNumbers = false,
                           showConvexHulls = false,
                           showInternalEdges = false,
                           showMousePosition = false,
                           timing = {
                               historySize: 60,
                               delta: 0,
                               deltaHistory: [],
                               lastTime: 0,
                               lastTimestamp: 0,
                               lastElapsed: 0,
                               timestampElapsed: 0,
                               timestampElapsedHistory: [],
                               engineDeltaHistory: [],
                               engineElapsedHistory: [],
                               elapsedHistory: []
                           }
                       } = {}) {
            this.canvas = canvas = canvas || document.createElement("canvas");
            const {
                Engine, Render, Runner, Bodies, Composite, Constraint, MouseConstraint, Mouse,
                Body, Vector, Composites
            } = Matter;
            this.tickListeners = [];
            const physicsEngine = Engine.create();
            const mouse = Mouse.create(canvas), mouseConstraint = MouseConstraint.create(physicsEngine, {
                mouse,
                constraint: {stiffness: 0.2, render: {visible: true}}
            });
            const renderer = Render.create({
                element: document.body,
                canvas,
                engine: physicsEngine,
                controller: Render,
                mouse,
                options: {
                    width, height, pixelRatio, background, wireframeBackground, wireframes, showSleeping,
                    showDebug, showStats, showPerformance, showBounds, showVelocity, showCollisions,
                    showSeparations, showAxes, showPositions, showAngleIndicator, showIds, showVertexNumbers,
                    showConvexHulls, showInternalEdges, showMousePosition
                }
            });
            Render.run(renderer);
            const physicsRunner = Runner.create();
            Runner.run(physicsRunner, physicsEngine);
            const _rW = Render.world;
            Render.world = (...args) => {
                _rW(...args);
                this.tickListeners.forEach(i => i());
            }

            this.add = (...bodies) => {
                Composite.add(physicsEngine.world, bodies.map(i => i.body));
                return this;
            }

            this.mouseConstraint = {body: mouseConstraint};
        }

        function RigidBody(call) {
            this.position = new Vector2(0, 0);
            this.body = call();
            this.setPosition = (x, y) => {
                if (x instanceof Vector2) {
                    y = x.y;
                    x = x.x;
                }
                Matter.Body.setPosition(this.body, Matter.Vector.create(x, y));
            };
        }

        RigidBody.circle = function CircleRigidBody(x, y, r, options = {
            isStatic: false,
            isSensor: false,
            isKinematic: false,
            isBullet: false,
            isFixedRotation: false,
            friction: 0.3,
            restitution: 0.5,
            density: 1,
            render: {
                fillStyle: "#fff",
                strokeStyle: "#fff",
                lineWidth: 1
            },
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFF,
                group: 0x0001
            }
        }) {
            RigidBody.call(this, () => Matter.Bodies.circle(x, y, r, options));
            this.body.SHAPE = "circle";
        }


        RigidBody.rectangle = function RectangleRigidBody(x, y, w, h, options = {
            isStatic: false,
            isSensor: false,
            isKinematic: false,
            isBullet: false,
            isFixedRotation: false,
            friction: 0.3,
            restitution: 0.5,
            density: 1,
            render: {
                fillStyle: "#fff",
                strokeStyle: "#fff",
                lineWidth: 1
            },
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFF,
                group: 0x0001
            }
        }) {
            RigidBody.call(this, () => Matter.Bodies.rectangle(x, y, w, h, options));
            this.body.SHAPE = "rectangle";
        }

        // TODO: polygon, rectangle, trapezoid

        RigidBody.rope = function RopeBody(options = {
            bodyA: null,
            bodyB: null,
            pointA: null,
            pointB: null,
            stiffness: 0.9,
            render: {
                visible: true,
                lineWidth: 1,
                strokeStyle: "#ff0000"
            },
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFF,
                group: 0x0001
            },
            label: "Constraint"
        }) {
            RigidBody.call(this, () => Matter.Constraint.create(options));
            this.body.SHAPE = "rope";
        }

        return {
            Vector2,
            RigidBody,
            Scene
        };
    }

    async function ThreeDimensionEngine({loadPhysics = true} = {}) {
        if (loadPhysics && !libraries.AmmoJS()) {
            const result = await loadScript("https://raw.githubusercontent.com/kripken/ammo.js/main/builds/ammo.wasm.js");
            if (result.error) alert("Failed to load AmmoJS");
        }
        if (!libraries.ThreeJS()) {
            const result = await loadScript("https://unpkg.com/three/build/three.min.js");
            if (result.error) alert("Failed to load ThreeJS");
        }

        function Scene() {
        }

        function RigidBody() {
        }

        return {
            Vector2,
            Vector3,
            RigidBody,
            Scene
        };
    }

    window.ENGINE = {TwoDimensionEngine, ThreeDimensionEngine};

    _resolve(window.ENGINE);
})();