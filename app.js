const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = []; // Array to hold the circle objects
const circleRadius = 20; // Radius of each circle
const circleSpacing = 10; // Spacing between each circle

// Calculate the x and y positions of each circle
for (let i = 0; i < 11; i++) {
  const x = circleSpacing + circleRadius;
  const y = circleSpacing + (circleRadius * 2 + circleSpacing) * i;
  const circle = { x, y };
  circles.push(circle);
}

// Draw all the circles on the canvas
function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
  });
}

// Update the position of the circle being dragged
function updateCirclePosition(x, y) {
  const circle = circles.find((circle) => circle.dragging);
  if (circle) {
    circle.x = x;
    circle.y = y;
    drawCircles();
  }
}

// Add event listeners to track mouse movements
circles.forEach((circle) => {
  circle.dragging = false;
  circle.lastX = 0;
  circle.lastY = 0;

  canvas.addEventListener("mousedown", (event) => {
    if (event.button === 0) { // Only track left mouse button
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
      if (distance < circleRadius) { // Check if mouse is within circle
        circle.dragging = true;
        circle.lastX = mouseX;
        circle.lastY = mouseY;
      }
    }
  });

  canvas.addEventListener("mouseup", (event) => {
    if (event.button === 0) { // Only track left mouse button
      circle.dragging = false;
    }
  });

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    updateCirclePosition(mouseX, mouseY);
  });
});

drawCircles(); // Draw the circles initially
