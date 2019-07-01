function preload () {
    this.load.image('ball', 'https://labs.phaser.io/assets/sprites/block.png');
    this.load.image('droplet', 'droplet.png');
    this.load.image('water', 'water.jpg');
}

function create () {
    const bodies = this.add.group([
        this.add.water(0, 0, 800, 800, 400, {
            texture: 'water',
        })
    ]);

    this.input.on('pointerdown', ({ worldX, worldY }) => {
        this.matter.add
            .image(worldX, worldY, 'ball')
            .setBounce(1);
    });

    this.collision.addOnCollideStart({
        objectA: bodies
            .getChildren()
            .map(({ sensor }) => sensor),
        callback: ({ gameObjectA: waterBody, gameObjectB, }) => {
            const i = waterBody.columns.findIndex((col, i) => waterBody.x + col.x >= gameObjectB.x && i);
            const speed = gameObjectB.body.speed * 3;
            const numDroplets = Math.ceil(gameObjectB.body.speed);

            gameObjectB.setFrictionAir(0.25);
            waterBody.splash(Phaser.Math.Clamp(i, 0, waterBody.columns.length - 1), speed, numDroplets);
        },
    });
}

new Phaser.Game({
    plugins: {
        global: [
            {
                key: 'WaterBodyPlugin',
                mapping: 'waterplugin',
                plugin: WaterBodyPlugin,
                start: true,
            },
        ],
        scene: [
            {
                key: 'CollisionPlugin',
                plugin: PhaserMatterCollisionPlugin,
                mapping: 'collision'
            },
        ],
    },
    physics: {
        default: 'matter',
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: 800,
        mode: Phaser.Scale.FIT,
        parent: 'demo',
        width: 800,
    },
    scene: {
        create,
        preload,
    },
    type: Phaser.AUTO,
});
