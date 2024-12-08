const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let startX, startY;
let currentTool = 'pencil';
let pencilSize = 5; // Default pencil size

// Event Listeners for Tool Selection
document.getElementById('pencilBtn').onclick = () => setTool('pencil');
document.getElementById('eraserBtn').onclick = () => setTool('eraser');
document.getElementById('lineBtn').onclick = () => setTool('line');
document.getElementById('rectBtn').onclick = () => setTool('rectangle');
document.getElementById('circleBtn').onclick = () => setTool('circle');
document.getElementById('clearBtn').onclick = clearCanvas;
document.getElementById('download').onclick = downloadCanvas;
document.getElementById('colorPicker').oninput = (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
};
document.getElementById('sizeInput').oninput = (e) => {
    pencilSize = parseInt(e.target.value, 10); // Ensure the size is a number
};

// Mouse Events for Drawing
canvas.onmousedown = (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (currentTool === 'pencil') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineWidth = pencilSize; // Set pencil size
    }
};

canvas.onmousemove = (e) => {
    if (!drawing) return;

    const x = e.offsetX, y = e.offsetY;

    if (currentTool === 'pencil') {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else if (currentTool === 'eraser') {
        // Erase area around the current mouse position
        ctx.clearRect(x - pencilSize / 5, y - pencilSize / 5, pencilSize, pencilSize);
    }
};

canvas.onmouseup = (e) => {
    if (drawing) {
        const x = e.offsetX, y = e.offsetY;

        if (currentTool === 'line') {
            drawLine(startX, startY, x, y);
        } else if (currentTool === 'rectangle') {
            drawRectangle(startX, startY, x - startX, y - startY);
        } else if (currentTool === 'circle') {
            drawCircle(startX, startY, Math.sqrt((x - startX) ** 2 + (y - startY) ** 2));
        }
    }
    drawing = false;
};

// Drawing Functions
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = pencilSize;
    ctx.stroke();
}

function drawRectangle(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = pencilSize;
    ctx.stroke();
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.lineWidth = pencilSize;
    ctx.stroke();
}


// Utility Functions
function setTool(tool) {
    currentTool = tool;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'drawing.png';
    link.click();
}

// Toggle menu visibility
function toggleMenu() {
    const menuContent = document.getElementById('menuContent');
    menuContent.classList.toggle('active');
}

// Close the menu if clicked outside
window.onclick = (event) => {
    const menuContent = document.getElementById('menuContent');
    if (!event.target.closest('.menu')) {
        menuContent.classList.remove('active');
    }
};

// Remove the rainbow intro after animation
setTimeout(() => {
    const rainbowIntro = document.querySelector('.rainbow-intro');
    if (rainbowIntro) {
        rainbowIntro.style.display = 'none';
        document.body.style.opacity = 1; // Ensure the body is visible after the intro
    }
}, 2000); // 2-second delay
