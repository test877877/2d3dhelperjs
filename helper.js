(async () => {
    const loadScript = (src, async = true) => new Promise(r => {
        const element = document.createElement("script");
        element.setAttribute("src", src);
        element.setAttribute("type", "text/javascript");
        element.setAttribute("async", async.toString());
        document.body.appendChild(element);
        element.addEventListener("load", r);
        element.addEventListener("error", ev => r(ev));
    });
    const libraries = {
        AmmoJS: () => window["Ammo"],
        MatterJS: () => window["Matter"]
    };

    function TwoDimensionEngine() {
        if(!libraries.MatterJS) loadScript("");
        return {
            Vector2: null,
            Entity: null,
            Model: null,
            RigidBody: null,
            Scene: null
        };
    }

    function ThreeDimensionEngine() {
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