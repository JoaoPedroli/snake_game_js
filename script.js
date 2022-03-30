const equals = (a, b) => a.x === b.x && a.y === b.y;
const getCoordinate = (x, y) => {
  return {
    x,
    y,
  };
};

window.onload = () => {
  const stage = document.getElementById("stage");
  const context = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  setInterval(renderGame, 80);

  const velocity = 1;
  const pixelSize = 30;
  const numberPixels = 20;

  let applePosition = getCoordinate(18, 18);
  let velocityXY = getCoordinate(0, 0);
  let header = getCoordinate(1, 1);
  let trail = [];
  let tail = 5;

  function renderGame() {
    init();
    checkAndFixLimits();
    renderScreen();
    renderApple();
    renderSnake();
    const ate = checkIfTheSnakeAteTheFruit();
    if(ate) spawnAppleInRandomPlace();

    function init() {
      header.x += velocityXY.x;
      header.y += velocityXY.y;
    }

    function checkAndFixLimits() {
      if (header.x < 0) {
        header.x = numberPixels - 1;
      } else if (header.x > numberPixels - 1) {
        header.x = 0;
      } else if (header.y < 0) {
        header.y = numberPixels - 1;
      } else if (header.y > numberPixels - 1) {
        header.y = 0;
      }
    }

    function renderScreen() {
      context.fillStyle = "#151515";
      context.fillRect(0, 0, stage.width, stage.height);
    }

    function renderApple() {
      context.fillStyle = "red";
      context.fillRect(
        applePosition.x * pixelSize,
        applePosition.y * pixelSize,
        pixelSize,
        pixelSize
      );
    }

    function renderSnake() {
      context.fillStyle = "#27ce96";
      for (let i = 0; i < trail.length; ++i) {
        context.fillRect(
          trail[i].x * pixelSize,
          trail[i].y * pixelSize,
          pixelSize - 1,
          pixelSize - 1
        );
        if (equals(trail[i], header)) {
          velocityXY.x = velocityXY.y = 0;
          tail = 5;
        }
      }
      
      trail.push({ x: header.x, y: header.y });
      while (trail.length > tail) {
        trail.shift();
      }
    }

    function checkIfTheSnakeAteTheFruit() {
      return equals(applePosition, header);
    }

    function spawnAppleInRandomPlace() {
      ++tail;
      applePosition.x = Math.floor(Math.random() * numberPixels);
      applePosition.y = Math.floor(Math.random() * numberPixels);
    }

  }

  function keyPush(event) {
    const left = 37,
      up = 38,
      right = 39,
      down = 40;

    switch (event.keyCode) {
      case left:
        velocityXY = getCoordinate(-velocity, 0);
        break;
      case up:
        velocityXY = getCoordinate(0, -velocity);
        break;
      case right:
        velocityXY = getCoordinate(velocity, 0);
        break;
      case down:
        velocityXY = getCoordinate(0, velocity);
        break;
      default:
        break;
    }
  }
};
