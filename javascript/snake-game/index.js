/* Javascript */
const canvas = document.getElementById("game-area");
console.log(canvas);
const context = canvas.getContext("2d");

// context.fillStyle = 'red';
// context.fillRect(10, 10, 50, 50);

const Food = (x, y) => ({ x, y });
const SnakeBlock = (x, y, dir = "right", next, previous) => {
  console.log("In snake block ", next);
  return {
    x,
    y,
    dir,
    next,
    previous
  };
};

let snakeHead = SnakeBlock(50, 50, "right", null, null);
const food = Food(100, 100);
moveRight = snakeHead => {
  snakeHead.dir = "right";
};

moveLeft = snakeHead => {
  snakeHead.dir = "left";
};

moveUp = snakeHead => {
  snakeHead.dir = "up";
};

moveDown = snakeHead => {
  snakeHead.dir = "down";
};

document.onkeydown = e => {
  switch (e.code) {
    case "ArrowLeft":
      return moveLeft(snakeHead);
    case "ArrowRight":
      return moveRight(snakeHead);
    case "ArrowUp":
      return moveUp(snakeHead);
    case "ArrowDown":
      return moveDown(snakeHead);
    default:
      console.log("Unsupported key");
  }
};

let score = 0;

const updatePosition = snakeHead => {
  switch (snakeHead.dir) {
    case "right":
      if (snakeHead.dir !== "left") snakeHead.x += 1;
      break;
    case "left":
      if (snakeHead.dir !== "right") snakeHead.x -= 1;
      break;
    case "up":
      if (snakeHead.dir !== "down") snakeHead.y -= 1;
      break;
    case "down":
      if (snakeHead.dir !== "up") snakeHead.y += 1;
      break;
    default:
      return snakeHead;
  }
  return snakeHead;
};

const attachSnakeHead = snakeHead => {
  switch (snakeHead.dir) {
    case "right":
      console.log("ar");

      return SnakeBlock(
        snakeHead.x + 1,
        snakeHead.y,
        snakeHead.dir,
        snakeHead,
        null
      );
    case "left":
      console.log("al");

      return SnakeBlock(
        snakeHead.x - 1,
        snakeHead.y,
        snakeHead.dir,
        snakeHead,
        null
      );
    case "up":
      console.log("au");

      return SnakeBlock(
        snakeHead.x,
        snakeHead.y - 1,
        snakeHead.dir,
        snakeHead,
        null
      );
    case "down":
      console.log("ad");

      return SnakeBlock(
        snakeHead.x,
        snakeHead.y + 1,
        snakeHead.dir,
        snakeHead,
        null
      );
    default:
      return snakeHead;
  }
};

const draw = snakeHead => {
  if (snakeHead.previous === null) context.fillStyle = "black";
  else context.fillStyle = "blue";
  snakeHead = updatePosition(snakeHead);
  context.fillRect(snakeHead.x, snakeHead.y, 10, 10);
  if (snakeHead.next) {
    draw(snakeHead.next);
    snakeHead.next.dir = snakeHead.dir;
  }
  context.fillStyle = "yellow";
  context.fillRect(food.x, food.y, 10, 10);
  if ((snakeHead.x === food.x, snakeHead.y === food.y)) {
    score++;
    food.x = parseInt(Math.random() * 100);
    food.y = parseInt(Math.random() * 100);
    snakeHead = attachSnakeHead(snakeHead);
  }
  context.fillStyle = "black";
  context.font = "10px serif";
  context.fillText(`Score: ${score}`, 250, 10);
  console.log(snakeHead);
};

setInterval(() => {
  context.clearRect(0, 0, 300, 300);
  draw(snakeHead);
}, 40);
