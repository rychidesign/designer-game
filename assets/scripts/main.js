class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this);
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
        this.ctx.fillStyle = 'red';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.gravity = 1.5 * this.ratio;
        this.speed = 3 * this.ratio;
        this.background.resize();
        this.player.resize();
    }
    render(){
        this.background.update();
        this.background.draw();
        this.player.update();
        this.player.draw();
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