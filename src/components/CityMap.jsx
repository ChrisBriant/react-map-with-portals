import { useEffect, useRef } from "react";
import CityMapImg from "../assets/city_map.jpg";

export default function CityMap({
  width = 1024,
  height = 1024,
  gridSize = 16, // logical grid: 16x16 tiles
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = CityMapImg;

    const draw = () => {
      canvas.width = width;
      canvas.height = height;

      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw grid overlay
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;

      for (let i = 0; i <= gridSize; i++) {
        const x = i * cellWidth;
        const y = i * cellHeight;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();

      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;

      const col = Math.floor(x / cellWidth);
      const row = Math.floor(y / cellHeight);

      const cellStartX = col * cellWidth;
      const cellStartY = row * cellHeight;

      console.log({ row, col, cellStartX, cellStartY });

      // Redraw base map + grid
      draw();

      // Highlight selected cell
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(cellStartX, cellStartY, cellWidth, cellHeight);
    };

    if (img.complete) {
      draw();
    } else {
      img.onload = draw;
    }

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [width, height, gridSize]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-2xl shadow-md border"
      />
    </div>
  );
}
