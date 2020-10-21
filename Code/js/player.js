import * as PIXI from 'pixi.js'

const Textures = {
    Platform: "Components/Assets.json",
    Character: "Components/adventurer-Sheet.json",
    Background: "Components/background.json"
};



function Player() {
    const resource = PIXI.Loader.shared.resources[Textures.Character];
    const sprite = new pixi.AnimatedSprite(resource.spritesheet.animations.idle);
    sprite.x = 50;
    sprite.y = 250;
    sprite.scale = new PIXI.Point(1.5, 1.5);
    sprite.play();
    sprite.animationSpeed = 0.1;
    return sprite;

}