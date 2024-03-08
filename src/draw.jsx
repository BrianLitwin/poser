export const drawCircle = (ctx, pt, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawLine = (ctx, start, end, color) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
};

export const drawImage = (image, canvas) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};
