(async () => {
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
    const libraries = {AmmoJS: () => window["Ammo"], MatterJS: () => window["Matter"]};

    async function TwoDimensionEngine() {
        if (!libraries.MatterJS()) await loadScript("https://unpkg.com/matter-js");
        return {
            Vector2: null,
            Entity: null,
            Model: null,
            RigidBody: null,
            Scene: null
        };
    }

    async function ThreeDimensionEngine() {
        if (!libraries.AmmoJS()) await loadScript("https://raw.githubusercontent.com/kripken/ammo.js/main/builds/ammo.wasm.js");
        return {
            Vector2: null,
            Vector3: null,
            Entity: null,
            Model: null,
            RigidBody: null,
            Scene: null
        };
    }
})();