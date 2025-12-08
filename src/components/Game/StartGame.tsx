// src/components/StartGame.tsx
import { useEffect, useRef, useState } from "react";
import car1 from "../../assets/img/game/car1.png";
import car2 from "../../assets/img/game/car2.png";
import car3 from "../../assets/img/game/car3.png";
import car4 from "../../assets/img/game/car4.png";
import car5 from "../../assets/img/game/car5.png";
import car6 from "../../assets/img/game/car6.png";
import bg from "../../assets/img/game/map1 copy.png";

const ROAD_LEFT = 60;
const ROAD_RIGHT = 360;

class Component {
  type: string;
  image: HTMLImageElement;
  isLoaded: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  speedX = 0;
  speedY = 0;

  constructor(width: number, height: number, src: string, x: number, y: number, type: string) {
    this.type = type;
    this.image = new Image();
    this.image.src = src;
    this.isLoaded = false;

    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.type === "image" && this.isLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  crashWith(other: Component) {
    return !(
      this.y + this.height < other.y ||
      this.y > other.y + other.height ||
      this.x + this.width < other.x ||
      this.x > other.x + other.width
    );
  }
}

export default function StartGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const myObstacles = useRef<Component[]>([]);
  const myGamePiece = useRef<Component | null>(null);
  const myGameArea = useRef<{ canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } | null>(null);
  const frameNo = useRef(0);
  const animationRef = useRef<number | null>(null);
  const backgroundYRef = useRef(0);

  const opponentCars = [car1, car2, car3, car4, car5, car6];
  const keyRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lastSwipeTime = useRef<number>(0);

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const roadImage = new Image();
  roadImage.src = bg;

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 420;
    canvas.height = 500;

    myGamePiece.current = new Component(40, 70, car1, 200, canvas.height - 80, "image");
    myGameArea.current = { canvas, context: ctx };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("deviceorientation", handleDeviceTilt, true);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    
    updateGameArea();

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("deviceorientation", handleDeviceTilt);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  const handleTouchMove = (e: TouchEvent) => {
    if (!myGamePiece.current || !canvasRef.current) return;
  
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    // const touchY = touch.clientY - rect.top;
  

    const newX = touchX - myGamePiece.current.width / 2;
    myGamePiece.current.x = Math.max(
      ROAD_LEFT,
      Math.min(newX, ROAD_RIGHT - myGamePiece.current.width)
    );
  
    // Y movement (up/down)
    // const newY = touchY - myGamePiece.current.height / 2;
    // myGamePiece.current.y = Math.max(
    //   0,
    //   Math.min(newY, 500 - myGamePiece.current.height)
    // );
  };
  
  

  const handleKeyDown = (e: KeyboardEvent) => {
    keyRef.current = e.keyCode;
  };

  const handleKeyUp = () => {
    keyRef.current = null;
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault(); // prevent scroll on swipe
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartX.current || !myGamePiece.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const now = Date.now();

    if (now - lastSwipeTime.current < 300) return;

    if (dx > 30 && myGamePiece.current.x + 50 <= ROAD_RIGHT - myGamePiece.current.width) {
      myGamePiece.current.x += 50;
    } else if (dx < -30 && myGamePiece.current.x - 50 >= ROAD_LEFT) {
      myGamePiece.current.x -= 50;
    }

    lastSwipeTime.current = now;
    touchStartX.current = null;
  };

  const handleDeviceTilt = (e: DeviceOrientationEvent) => {
    if (!myGamePiece.current) return;
    const gamma = e.gamma || 0;

    if (gamma > 10 && myGamePiece.current.x + 5 <= ROAD_RIGHT - myGamePiece.current.width) {
      myGamePiece.current.x += 5;
    } else if (gamma < -10 && myGamePiece.current.x - 5 >= ROAD_LEFT) {
      myGamePiece.current.x -= 5;
    }
  };

  const everyInterval = (n: number) => frameNo.current % n === 0;

  const updateGameArea = () => {
    if (!myGamePiece.current || !myGameArea.current || gameOver) return;
    const ctx = myGameArea.current.context;

    ctx.clearRect(0, 0, 420, 500);

    backgroundYRef.current += 2;
    if (backgroundYRef.current >= 500) backgroundYRef.current = 0;

    ctx.drawImage(roadImage, 0, backgroundYRef.current, 420, 500);
    ctx.drawImage(roadImage, 0, backgroundYRef.current - 500, 420, 500);

    frameNo.current += 1;

    if (frameNo.current === 1 || everyInterval(80)) {
      const randomCar = opponentCars[Math.floor(Math.random() * opponentCars.length)];
      const spawnX = Math.floor(Math.random() * (ROAD_RIGHT - ROAD_LEFT - 40)) + ROAD_LEFT;
      myObstacles.current.push(new Component(40, 70, randomCar, spawnX, 0, "image"));
    }

    for (let obs of myObstacles.current) {
      obs.y += 4;
      obs.update(ctx);

      if (myGamePiece.current.crashWith(obs)) {
        setGameOver(true);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return;
      }
    }

    if (keyRef.current === 37) myGamePiece.current.x -= 5;
    if (keyRef.current === 39) myGamePiece.current.x += 5;
    if (keyRef.current === 38) myGamePiece.current.y -= 5;
    if (keyRef.current === 40) myGamePiece.current.y += 5;

    myGamePiece.current.x = Math.max(ROAD_LEFT, Math.min(myGamePiece.current.x, ROAD_RIGHT - myGamePiece.current.width));
    myGamePiece.current.y = Math.max(0, Math.min(myGamePiece.current.y, 500 - myGamePiece.current.height));

    myGamePiece.current.update(ctx);
    setScore(frameNo.current);

    if (!gameOver) animationRef.current = requestAnimationFrame(updateGameArea);
  };

  const startAgain = () => {
    setGameOver(false);
    setScore(0);
    frameNo.current = 0;
    myObstacles.current = [];
    backgroundYRef.current = 0;
    myGamePiece.current = new Component(40, 70, car1, 200, 500 - 80, "image");
    window.location.reload();- 
    updateGameArea();
  };

  return (
    <div className="min-h-screen lg:pt-10 flex items-center justify-center px-4 bg-black">
      <div className="canvas w-full max-w-md bg-gray-800 p-0 rounded-lg shadow-lg text-white">
        <div className="flex gap-4 mb-1 items-center px-3 pt-2">
          <img
            src="https://img.freepik.com/free-vector/smiling-young-man-glasses_1308-174702.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-4 border-red-500 object-cover"
          />
          <div>
            <h1 className="text-xl font-bold">RacerX</h1>
            <p className="text-sm text-gray-300">Level {Math.floor(score / 500)}</p>
          </div>
        </div>

        <div className="relative">
          <canvas ref={canvasRef} className="w-full h-auto touch-none" />

          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-center">
              <p className="text-lg mb-2">
                Level: <span className="text-red-500">{Math.floor(score / 500)}</span>
              </p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={startAgain}
              >
                Game Over!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
