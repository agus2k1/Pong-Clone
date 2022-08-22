const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001;

export class Ball {
    constructor(ball){
        this.ball = ball;
        this.reset();
    }
    get x(){
        return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"));
    }
    set x(value){
        this.ball.style.setProperty("--x", value);
    }
    get y(){
        return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"));
    }
    set y(value){
        this.ball.style.setProperty("--y", value);
    }
    rect(){
        return this.ball.getBoundingClientRect();
    }
    reset(){
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9){
            const heading = Math.random() * 2 * Math.PI;
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }
    update(deltatime, paddleRects){
        this.x += this.direction.x * this.velocity * deltatime;
        this.y += this.direction.y * this.velocity * deltatime;
        this.velocity += VELOCITY_INCREASE * deltatime;
        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0){
            this.direction.y *= -1;
        }
        if (paddleRects.some(r => isCollison(r, rect))){
            this.direction.x *= -1;
        }
    }
}

function isCollison(rect1, rect2){
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    );
}