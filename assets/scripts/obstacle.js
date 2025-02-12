class Obstacle {
    constructor(game, x){
        this.game = game;
        this.spriteWidth = 120 * this.game.ratio;
        this.spriteHeight = 120 * this.game.ratio;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.x = x;
        this.y = this.game.height * 0.5 - this.height;

    }
    update(){
        this.x -= this.game.speed;
    }
    draw(){
        this.game.ctx.fillRect(this.x, this.y, this.scaledWidth, this.scaledHeight);
    }
    resize(){
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
    }
}