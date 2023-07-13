// Constants and variables 
let inputDir = {x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const GameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const music = new Audio('music/music.mp3');
let speed = 15;
let LastPaintTime = 0;
let score = 0;

let snakeArr = [
    {x:13,y:15}
];
food = {x:9,y:10};

// Game functions 

const main = (ctime) =>{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - LastPaintTime)/1000 < 1/speed){
        return;
    }
    LastPaintTime = ctime;
    music.play();
    gameEngine();
}

const isCollide = (snake) =>{
    // snake collide into itself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }         
    }
    // snake collide to wall 
    if(snake[0].x>=18||snake[0].y>=18||snake[0].x<=0||snake[0].y<=0){
        return true;
    }  
}

const gameEngine = () =>{
    // Part 1 : update the snake Array
    if(isCollide(snakeArr)){
        GameOverSound.play();
        music.pause();
        alert("Game Over. Press any key to play again!");
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        inputDir = {x:0,y:0};
        snakeArr = [{x:13,y:15}];
        music.play();    
    }

    // score increment and food regenerate 

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            HiscoreBox.innerHTML = "High score : "+hiscoreval;
        }
        scoreBox.innerHTML = "Score : "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x : Math.round(a+(b-a)*Math.random()),y : Math.round(a+(b-a)*Math.random())}
    }

    // moving snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2 : display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic 

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    HiscoreBox.innerHTML = "High score : "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:-1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrorUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrorDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrorRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrorLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});





