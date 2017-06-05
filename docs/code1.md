## Code

Compleet code voorbeeld voor tekenen cirkel en sprite

```
class Game {
    
    private renderer:PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage:PIXI.Container;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        
        this.preloadSprites();
        this.addCircle();
        this.render();
    }

    private preloadSprites():void {       
        PIXI.loader.add('car', 'images/car.png').add('road', 'images/road.png');
        PIXI.loader.load(() => this.setupSprites());
    }

    private setupSprites():void{
        let road = new PIXI.Sprite(PIXI.loader.resources["road"].texture);
        let car = new PIXI.Sprite(PIXI.loader.resources["car"].texture);
        car.position.set(100,100);

        this.stage.addChild(road, car);
        this.render();
    }

    private render():void {
        this.renderer.render(this.stage);
    }

    private addCircle():void {
        let pixiCircle = new PIXI.Graphics();
        pixiCircle.lineStyle(2, 0xFF00FF);  //(thickness, color)
        pixiCircle.drawCircle(110, 110, 20);   //(x,y,radius)
        this.stage.addChild(pixiCircle);
        this.render();
    }
} 

// load
window.addEventListener("load", function() {
    new Game();
});
```