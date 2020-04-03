class preload extends Phaser.Scene {
  constructor () {
    super('preload');
  }

  preload () {
    //TODO: LOAD RENJS OWN SPLASH SCREEN
    this.splash = this.add.sprite(0, 0, 'splash').setOrigin(0, 0);
    this.load.script('esprima',  'libs/esprima.js');
    this.load.script('yaml',  'libs/js-yaml.min.js');
    this.load.script('underscore',  'libs/underscore-min.js');

    loadStyle(preparePath(globalConfig.fonts));
    this.load.text("guiConfig", preparePath(globalConfig.guiConfig));
    this.load.text("storySetup", preparePath(globalConfig.storySetup));
    for (var i = globalConfig.storyText.length - 1; i >= 0; i--) {
      this.load.text("story"+i, preparePath(globalConfig.storyText[i]));
    };
  }

  create () {
    //load the setup
    RenJS.setup = jsyaml.load(this.cache.text.get("storySetup"));
    var that = this;
    //load the story text
    var story = {};
    _.each(globalConfig.storyText,function (file,index) {
        var text = jsyaml.load(that.cache.text.get("story"+index));
        story = _.extend(story,text);
    });
    RenJS.story = story;
    //load and create the GUI
    var gui = jsyaml.load(this.cache.text.get("guiConfig"));
    RenJS.gui = new SimpleGUI(gui);
    //preload the fonts by adding text, else they wont be fully loaded :\
    _.each(RenJS.gui.elements.assets.fonts,function(font){
        // console.log("loading" + font)
        that.add.text(20, 20, font, {font: '42px '+ font});
    });
    //start preloading story
    this.scene.start('preloadstory');
  }
}
