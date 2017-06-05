# PixiJS in Typescript

- Setup
- Tekenen met PIXI
- Game Loop

## Setup

### Download library

[Download](https://github.com/pixijs/pixi.js/releases/tag/v4.0.0) **pixi.min.js** en **pixi.min.js.map** en plaats ze in `docs/js/`

### Definition file

[Download de .d.ts definition file](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pixi.js/index.d.ts) voor Typescript en plaats deze in de map definitions.

### HTML

Laad de library voordat je je eigen main.js inlaadt.
```
<body> 
      <script src="js/pixi.min.js"></script>
      <script src='js/main.js'></script>
</body>
```

## Tekenen met PIXI

### Canvas aanmaken

Initialiseer PIXI met een canvas, in de main game class. We maken een aparte functie voor render, zodat we die later ook weer kunnen aanroepen.
```
class Game {
    
    private renderer:PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private stage:PIXI.Container;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.render();
    }

    private render():void {
        this.renderer.render(this.stage);
    }
} 

```
### Een cirkel tekenen

Om te testen of PIXI werkt tekenen we een cirkel in de canvas. Vergeet niet om addCircle() aan te roepen in de constructor. Kijk in de [API documentatie](http://pixijs.download/release/docs/index.html) om te zien welke methods er beschikbaar zijn. 

```
class Game {
    private addCircle():void {
        let pixiCircle = new PIXI.Graphics();
        pixiCircle.lineStyle(2, 0xFF00FF); 
        pixiCircle.drawCircle(110, 110, 20);
        this.stage.addChild(pixiCircle);
        this.render();
    }
} 
```

### Sprites laden en tekenen

We gaan alle benodigde sprites voor de game **preloaden** in game.ts via `Loader.add`. We kunnen een shortcut meegeven zodat we de image later makkelijk terug kunnen vinden: `Loader.add('car', 'images/car.png')`. De functie setupSprites wordt aangeroepen als alle images geladen zijn. Daarna bouwen we sprites van de images, en we voegen de sprites toe aan de stage.

```
class Game {
    private preloadSprites():void {       
        PIXI.loader.add('car', 'images/car.png').add('road', 'images/road.png');
        PIXI.loader.load(() => this.setupSprites());
    }
    private setupSprites():void{
        let road = new PIXI.Sprite(PIXI.loader.resources["road"].texture);
        let car = new PIXI.Sprite(PIXI.loader.resources["car"].texture);
        this.stage.addChild(road, car);
        this.render();
    }
}
```
- [Compleet code voorbeeld 1](docs/code1.md)


## Game Loop

Als het bovenstaande gelukt is kunnen we het aanmaken en updaten van objecten gaan verplaatsen naar gameobject instances. Als de preloader klaar is maken we nieuwe instances en we starten de Game Loop. De game loop update alle objecten en rendert daarna de PIXI canvas. 

```
class Game {
    private cars:Array<Car> = new Array<Car>();
    private setupSprites():void{
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        for(let c of this.cars){
            c.update();
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(() => this.gameLoop());
    }
}
```

### Car instance

De car instances gaan hun eigen sprites aanmaken en x en y posities updaten. We geven de stage mee aan de Car zodat Car de sprite op de stage kan zetten.
```
class Game {
    private setupSprites():void{
        this.cars.push(new Car(this.stage));
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Car {
    private sprite:PIXI.Sprite;
    constructor(stage:PIXI.Container){
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["car"].texture);
        this.sprite.position.set(10,100);
        stage.addChild(this.sprite);
    }
    public update(){
        this.sprite.x++;
    }
}
```

### GameObject interface

Door Car en Road een GameObject interface te geven kunnen we een GameObject array maken.
```
class Game {
    private gameObjects:Array<GameObject> = new Array<GameObject>();
    private setupSprites(){
        this.gameObjects.push(new Car(this.stage));
    }
}

interface GameObject {
    update() : void;
}

class Car implements GameObject {
    private sprite:PIXI.Sprite;
    constructor(stage:PIXI.Container){
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[str].texture);
        stage.addChild(this.sprite);
        this.sprite.position.set(-100,100);
    }
    public update(){
        this.sprite.x+=2;
    }
}
```

### Infinite scroll

Door de offset van een texture te verplaatsen kan je een infinite scroll effect bereiken. Om dat te kunnen doen maken we de Road een TilingSprite.
```
class Road implements GameObject {
    private tilingSprite:PIXI.extras.TilingSprite;
    constructor(stage:PIXI.Container){
        this.tilingSprite = new PIXI.extras.TilingSprite(
            PIXI.loader.resources["road"].texture, 
            640,
            480
        );
        stage.addChild(this.tilingSprite);
    }
    public update(){
        this.tilingSprite.tilePosition.x-=2;
    }
}
```

## PIXI tips

**Groepeer sprites**
```
let animals = new PIXI.Container();
animals.addChild(cat);
animals.addChild(hedgehog);
animals.addChild(tiger);
stage.addChild(animals);
```

**Collision detection**
```
hitTestRectangle(spriteOne, spriteTwo)
```

## Links

- [Website](http://www.pixijs.com)
- [Code Examples demo](https://pixijs.github.io/examples/#/basics/basic.js)
- [Javascript Tutorial](https://github.com/kittykatattack/learningPixi)
- [Library files](https://github.com/pixijs/pixi.js/releases/tag/v4.0.0)
- [Typescript definition file](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pixi.js/index.d.ts) 
- [API](http://pixijs.download/release/docs/index.html)
