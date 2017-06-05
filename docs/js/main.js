var Car = (function () {
    function Car(stage) {
        this.speed = 1;
        this.sprite = new PIXI.Sprite(PIXI.loader.resources["car"].texture);
        stage.addChild(this.sprite);
        this.sprite.position.set((Math.round(Math.random() * 8)) * -160 - 160, (Math.floor(Math.random() * 8)) * 80);
        this.speed = this.sprite.y / 50;
    }
    Car.prototype.update = function () {
        this.sprite.x += this.speed;
        if (this.sprite.x > 640) {
            this.sprite.x = -160;
        }
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.gameObjects = new Array();
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.preloadSprites();
    }
    Game.prototype.preloadSprites = function () {
        var _this = this;
        PIXI.loader.add('car', 'images/cars.png').add('road', 'images/road.png');
        PIXI.loader.load(function () { return _this.setupSprites(); });
    };
    Game.prototype.setupSprites = function () {
        var _this = this;
        this.gameObjects.push(new Road(this.stage));
        for (var i = 0; i < 30; i++) {
            this.gameObjects.push(new Car(this.stage));
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var go = _a[_i];
            go.update();
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Road = (function () {
    function Road(stage) {
        this.tilingSprite = new PIXI.extras.TilingSprite(PIXI.loader.resources["road"].texture, 640, 480);
        stage.addChild(this.tilingSprite);
    }
    Road.prototype.update = function () {
        this.tilingSprite.tilePosition.x -= 2;
    };
    return Road;
}());
//# sourceMappingURL=main.js.map