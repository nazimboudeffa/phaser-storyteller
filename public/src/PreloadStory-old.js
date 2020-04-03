class preloadStory extends Phaser.Scene {
  constructor () {
    super('preloadStory');
  }

  preload () {
    this.splash = this.add.sprite(0, 0, 'splash').setOrigin(0, 0);

    if (globalConfig.splash.loadingBar) {
        var position = globalConfig.splash.loadingBar.position;
        this.loadingBar = this.add.sprite(position.x, position.y , "loading").setOrigin(0, 0);
    }
    this.setPreloadSprite(this.loadingBar);
    //preload gui
    _.each(RenJS.gui.getAssets(),function(asset){
        if (asset.type == "spritesheet"){
            this.load.spritesheet(asset.key, preparePath(asset.file), asset.w, asset.h);
        } else {
            this.load[asset.type](asset.key, preparePath(asset.file));
        }
    });

    //preload backgrounds
    _.each(RenJS.setup.backgrounds,function(filename,background){
        this.load.image(background, preparePath(filename));
    });
    //preload cgs
    _.each(RenJS.setup.cgs,function(cgs,key){
        if (typeof cgs === 'string' || cgs instanceof String){
            // normal cgs
            this.load.image(key, preparePath(cgs));
        } else {
            // spritesheet animation
            var str = cgs.spritesheet.split(" ");
            this.load.spritesheet(key, preparePath(str[0]), parseInt(str[1]),parseInt(str[2]));
        }

    });
    // preload background music
    _.each(RenJS.setup.music,function(filename,music){
        this.load.audio(music, preparePath(filename));
    });
    //preload sfx
    _.each(RenJS.setup.sfx,function(filename,key){
        this.load.audio(key, preparePath(filename));
    },this);
    //preload characters
    _.each(RenJS.setup.characters,function(character,name){
        _.each(character.looks,function(filename,look){
            this.load.image(name+"_"+look, preparePath(filename));
        });
    });
    if (RenJS.setup.extra){
        _.each(RenJS.setup.extra,function(assets,type){
            if (type=="spritesheets"){
                _.each(assets,function(file,key){
                    var str = file.split(" ");
                    this.load.spritesheet(key, preparePath(str[0]), parseInt(str[1]),parseInt(str[2]));
                });
            } else {
                _.each(assets,function(file,key){
                    // console.log("loading "+key+ " "+file+" of type "+type);
                    this.load[type](key, preparePath(file));
                });
            }
        });
    }
  }

  create () {
    //init game and start main menu
    this.scene.start('init');
  }
}
