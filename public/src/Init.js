var Init = new Phaser.Class({

	Extends: Phaser.Scene,

	initialize:

  function Init ()
  {
    Phaser.Scene.call(this, {
      key: 'init'
    });
  },

  create: function (){
    RenJS.storyManager.setupStory();
    RenJS.gui.init();
    RenJS.initInput();
    RenJS.audioManager.init(function(){
        RenJS.gui.showMenu("main");
    });
  }
});
