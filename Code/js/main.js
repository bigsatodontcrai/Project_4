import * as PIXI from './pixi.js';



document.addEventListener('DOMContentLoaded', () => {
    const app = new PIXI.Application({
        view: HTMLCanvasElement,
        width: 800,
        height: 600,
        backgroundColor: 0xAAAAAA
    });
    document.body.appendChild(app.view);
    
    const player = Player();

    const container = new PIXI.container();

    container.addChild()

});


