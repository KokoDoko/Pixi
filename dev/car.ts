/// <reference path="gameobject.ts" />

class Car implements GameObject {
    private sprite:PIXI.Sprite;
    private speed:number = 1;
    constructor(stage:PIXI.Container){
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["car"].texture);
        stage.addChild(this.sprite);
        
        this.sprite.position.set((Math.round(Math.random()*8))*-160-160,(Math.floor(Math.random()*8))*80);
        this.speed = this.sprite.y/50;
    }
    public update(){
        this.sprite.x+=this.speed;

        if(this.sprite.x > 640) {
            this.sprite.x = -160;
        }
    }
}