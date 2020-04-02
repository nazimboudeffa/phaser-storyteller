class preload extends Phaser.Scene {
  constructor () {
    super('preload');
  }

  preload () {
    //TODO: LOAD RENJS OWN SPLASH SCREEN
    this.splash = this.add.sprite(0, 0, 'splash').setOrigin(0, 0);
  }
}
