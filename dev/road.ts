/// <reference path="gameobject.ts" />
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