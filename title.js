class LogoScene extends Phaser.Scene {
    constructor()
    {
        super('intro');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('logo', 'Logo.png');
        this.load.audio('logoSound', ['logo.wav']);
    }

    create()
    {

        const jingle = this.sound.add('logoSound');




        this.logo = this.add.image(
            950,
            550,
            'logo'
        )

        this.logo.scale = 0.5;

        this.cameras.main.setBackgroundColor('#ff5900');
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.time.delayedCall(500, () =>
        {
            jingle.play();
        })

        this.time.delayedCall(4000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);            
        });

        this.time.delayedCall(5000, () => {
            this.scene.start('tunnel');
        });
    }
    

}



class TunnelScene extends Phaser.Scene{
    constructor()
    {
        super('tunnel');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.image('tunnel', 'dungeon.jpg');
        this.load.image('hand', 'Hand.png');
    }

    create()
    {
        this.dungeon = this.add.image(
            1920/2,
            1080/2,
            'tunnel'
        );

        this.dungeon.originX = 0;
        this.dungeon.originY = 0;
        this.dungeon.scale = 6;

        this.cameras.main.fadeIn(2000, 0,0,0);


        //Two rectangles.
        let r1 = this.add.rectangle(300, 300, 400, 500, 0x0);
        r1.alpha = 0;

        let r2 = this.add.rectangle(1600, 800, 400, 300, 0x0);
        r2.alpha = 0;


        //Two text boxes.

        let text1 = this.add.text(150, 100, 
            `You musn’t scream. You mustn’t cry out in prayer.
            `
        )

        text1.setWordWrapWidth(300);

        text1.setFontSize(60);


        let text2 = this.add.text(1430, 670,
            `This is your deservèd hell.
            `
        )

        text2.setWordWrapWidth(300);
        text2.setFontSize(60);

        text2.alpha = 0;
        text1.alpha = 0;

        //Skeleton hand moves in from the bottom.

        this.time.delayedCall(1000, () => {
            this.add.tween({
                targets: [text1, r1],
                alpha: {from: 0, to: 1},
                duration: 2000
            });

        });



        this.time.delayedCall(4000, () => {
            this.add.tween({
                targets: [text2, r2],
                alpha: {from: 0, to: 1},
                duration: 2000
            });

        });

        this.time.delayedCall(8000, () => {
            this.add.tween({
                targets: [text2, r2, text1, r1],
                alpha: {from: 1, to: 0},
                duration: 1000
            });

        });

        let hand = this.add.image(850, 1100, 'hand');

        this.time.delayedCall(10000, () => {
            this.add.tween({
                targets: [hand],
                y: {from: 1100, to: 600},
                duration: 1500,
                ease: 'quart.out'
            });

        });

        this.time.delayedCall(12000, () => {

            this.cameras.main.fadeOut(2000, 0,0,0);
        });

        this.time.delayedCall(14000, () => {

            this.scene.start('title');
        });
        
    }
}

class TitleScene extends Phaser.Scene
{
    constructor()
    {
        super('title');
    }

    preload()
    {
        this.load.path = './assets/';
        this.load.audio('titleMusic', ['theme.wav']);
        this.load.image('skeleton', 'Skeleton.png');
        this.load.image('titleLogo', 'title.png');
    }

    create()
    {
        const mus = this.sound.add('titleMusic');
        mus.play();
        this.cameras.main.fadeIn(1000, 0,0,0);

        let skelly = this.add.image(1500, 550, 'skeleton');

        let logo = this.add.image(700, 500, 'titleLogo');

        logo.alpha = 0;

        logo.scale = 0.8

        this.time.delayedCall(2000, () => {
            
            this.add.tween({
                targets: [logo],
                alpha: {from: 0, to: 1},
                duration: 500,
                ease: 'quart.out'
            });
            
        });

        






    }
}

new Phaser.Game(
    {
        width: 1920,
        height: 1080,
        scene: [LogoScene, TunnelScene, TitleScene]
    }
);
