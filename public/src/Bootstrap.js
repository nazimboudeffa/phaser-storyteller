class bootstrap extends Phaser.Scene {
  constructor () {
    super('bootstrap');
  }

  preload () {
    this.load.image('splash',  preparePath(globalConfig.splash.loadingScreen));
    if (globalConfig.splash.loadingBar) {
      this.load.image('loading',  preparePath(globalConfig.splash.loadingBar.fullBar));
    }
  }

  create () {
    game.scene.start('preload');
  }
}
