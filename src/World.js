class World {

    constructor(state) {
        this.state = state; // Store the injected state
        let scene = this.state.scene;
        let manager = new THREE.LoadingManager();
        let loader = new THREE.ObjectLoader(manager);

        // Light
        /*
         let pointLight = this.createLight( 0xffffff );
         scene.add( pointLight );
         scene.add(new THREE.PointLightHelper(pointLight, 10));
         */

        //let ambLight = new THREE.AmbientLight(0xFFFFFF);
        //scene.add(ambLight)

        /*
         var ambientLight = new THREE.AmbientLight(new THREE.Color(0.3, 0.3, 0.3));
         ambientLight.name = 'ambientLight';
         scene.add(ambientLight);
         */

        var dirLight = new THREE.DirectionalLight(0xffffbb, 1);
        dirLight.position.set(5600, 7000, 300);
        dirLight.castShadow = true;
        dirLight.shadowCameraVisible = true;
        dirLight.shadowDarkness = 0.5;
        dirLight.shadowCameraRight = 5;
        dirLight.shadowCameraLeft = -5;
        dirLight.shadowCameraTop = 5;
        dirLight.shadowCameraBottom = -5;
        scene.add(dirLight);

        scene.add(new THREE.DirectionalLightHelper(dirLight, 10));

        /*
         let pointLight = new THREE.PointLight(0xFFFFFF, 5);
         pointLight.castShadow = true;
         scene.add(pointLight);
         */

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * 0.3 * heightMapWidth;
        let worldMapDepth = 100 * 0.3 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = 3*worldMapWidth;
        let skyboxDepth = 3*worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        scene.add(this.cube);

        // Cactus
        let cactusFile = '../Oblig4/models/cactus.json';
        this.addObject(scene, loader, cactusFile, 2500, 300, 3238, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 3530, 280, 2531, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 5018, 300, 3894, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 538, 300, 2819, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 4274, 300, 4576, 300, 300, 300);

        this.addObject(scene, loader, cactusFile, 100, 300, -200, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 600, 300, 600, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -400, 300, -600, 300, 300, 300);

        this.addObject(scene, loader, cactusFile, 3000, 380, -4253, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 3200, 380, -4576, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, 4274, 380, -4976, 300, 300, 300);

        (-4900, 390, 5300);
        this.addObject(scene, loader, cactusFile, -4974, 350, 4976, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -4574, 350, 4576, 300, 300, 300);
        this.addObject(scene, loader, cactusFile, -5374, 350, 4176, 300, 300, 300);

        // Water
        let waterInstance = new Water();
        let waterPlane = waterInstance.createWater(worldMapWidth, worldMapDepth);
        scene.add(waterPlane);

        // Grass
        let grassInstance = new Grass();
        let grass = grassInstance.generateGrass();
        scene.add(grass);

        // Fog
        //scene.fog = new THREE.FogExp2( 0xefd1b5, 0.001 );

        // NB: Husk å blende overganger mellom teksturer!
    }

    addObject(scene, loader, file, posx, posy, posz, scalex, scaley, scalez) {

        loader.load(file, function (object) {

            object.castShadow = true;
            object.receiveShadow = true;
            object.position.x = posx;
            object.position.y = posy;
            object.position.z = posz;
            object.scale.x = scalex;
            object.scale.y = scaley;
            object.scale.z = scalez;
            scene.add(object);
        });
    }

    createLight(color) {
        var pointLight = new THREE.PointLight(color, 1, 30);
        pointLight.castShadow = true;
        pointLight.shadow.camera.near = 1;
        pointLight.shadow.camera.far = 30;
        pointLight.position.set(5600, 1000, 300);
        // pointLight.shadowCameraVisible = true;
        pointLight.shadow.bias = 0.01;
        var geometry = new THREE.SphereGeometry(0.3, 12, 6);
        var material = new THREE.MeshBasicMaterial({color: color});
        var sphere = new THREE.Mesh(geometry, material);
        pointLight.add(sphere);
        return pointLight
    }

}