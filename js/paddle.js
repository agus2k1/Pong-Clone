const SPEED = .02;

export class Paddle {
    constructor(paddle){
        this.paddle = paddle;
        this.reset();
    }
    get position(){
        return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--position"));
    }
    set position(value){
        this.paddle.style.setProperty("--position", value);
    }
    rect(){
        return this.paddle.getBoundingClientRect();
    }
    reset(){
        this.position = 50;
    }
    update(deltatime, ballHeight){
        this.position += SPEED * deltatime * (ballHeight - this.position);
    }
}