// preloader and loading bar

var Preloader = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

	function Preloader ()
	{
		// note: the pack:{files[]} acts like a pre-preloader
		// this eliminates the need for an extra "boot" scene just to preload the loadingbar images
		Phaser.Scene.call(this, {
			key: 'preloader',
			pack: {
				files: [
					{ type: 'image', key: 'loadingbar_bg', url: globalConfig.splash.loadingScreen },
					{ type: 'image', key: 'loadingbar_fill', url: globalConfig.splash.loadingBar.fullBar }
				]
			}
		});
	},

	onProgress: function (value) {
    this.loadingbar_fill.setCrop(0, 0, Math.max(1, value * 412), 93);
	},

	onFileProgress: function (file) {
		console.log('onFileProgress: file.key=' + file.key);
	},

	preload: function ()
	{
    // setup the loading bar
    // note: images are available during preload because of the pack-property in the constructor
    this.loadingbar_bg   = this.add.sprite(0, 0, "loadingbar_bg").setOrigin(0, 0);
    this.loadingbar_fill = this.add.sprite(111, 462, "loadingbar_fill").setOrigin(0, 0);
    this.load.on('progress', this.onProgress, this );
    this.load.on('fileprogress', this.onFileProgress, this );

    this.load.script('esprima',  'libs/esprima.js');
    this.load.script('yaml',  'libs/js-yaml.min.js');
    this.load.script('underscore',  'libs/underscore-min.js');

    loadStyle(preparePath(globalConfig.fonts));

    this.load.text("guiConfig", preparePath(globalConfig.guiConfig));
    this.load.text("storySetup", preparePath(globalConfig.storySetup));
    for (var i = globalConfig.storyText.length - 1; i >= 0; i--) {
      this.load.text("story"+i, preparePath(globalConfig.storyText[i]));
    };
	},

	create: function ()
	{
		console.log('Preloader scene is ready, now start the actual game and never return to this scene');

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

		// start actual game
		this.scene.start('init');
	}
});
