class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.obstacles = [];
        this.numberOfObstacles = 10;
        this.player = new Player(this);
        this.gravity;
        this.speed;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        })
        // mouse controls
        this.canvas.addEventListener('mousedown', e => {
            this.player.jump();
        })
        // keyboard controls
        window.addEventListener('keydown', e => {
            if (e.key == " " || e.code == "Space" || e.key == "Enter") {
              this.player.jump();
            }
        })
        // touch controls
        this.canvas.addEventListener('touchstart', e => {
              this.player.jump();
        })
    }
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'blue';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.gravity = 1.5 * this.ratio;
        this.speed = 3 * this.ratio;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
    }
    render(){
        this.background.update();
        this.background.draw();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });
    }
    createObstacles(){
        this.obstacles = [];
        const firstX = 100;
        const obstacleSpacing = 400 * this.ratio;
        for (let i = 0; i < this.numberOfObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));  
        }        
    }
}

window-addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    //canvas.width = 720;
    //canvas.height = 720;

    const game = new Game(canvas, ctx);
    game.render();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.render();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
})