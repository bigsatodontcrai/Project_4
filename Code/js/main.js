import * as PIXI from 'pixi.js';
import PIXI from './pixi';



document.addEventListener('DOMContentLoaded', () => {
    const app = createPixiApp({
        view: CanvasElement,
        width: 800,
        height: 600,
        backgroundColor: 0xAAAAAA
    });
    document.body.appendChild(app.view);
    
    const player = Player();

    const container = new PIXI.container();

    container.addChild()

});


