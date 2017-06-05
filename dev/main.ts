class Game {
    
    private renderer:PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage:PIXI.Container;

    private gameObjects:Array<GameObject> = new Array<GameObject>();

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        
        this.preloadSprites();
    }

    private preloadSprites():void {       
        PIXI.loader.add('car', 'images/cars.png').add('road', 'images/road.png');
        PIXI.loader.load(() => this.setupSprites());
    }

    private setupSprites():void{
        this.gameObjects.push(new Road(this.stage));
        for(let i = 0;i<30;i++){
            this.gameObjects.push(new Car(this.stage));
        }
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        for(let go of this.gameObjects){
            go.update();
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(() => this.gameLoop());
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});