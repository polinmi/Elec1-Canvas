// Get the necessary elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const pencilBtn = document.getElementById('pencilBtn');
const eraserBtn = document.getElementById('eraserBtn');
const circleBtn = document.getElementById('circleBtn');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('download');

// Default settings
let drawing = false;
let tool = 'pencil'; // Can be 'pencil', 'eraser', or null
let currentShape = null; // Can be 'rectangle' or 'circle'
let currentColor = '#000000'; // Default color is black
let lineWidth = 5; // Pencil width

// Get canvas offset relative to the page
const canvasRect = canvas.getBoundingClientRect();

// Set up event listeners for canvas
canvas.addEventListener('mousedown', (e) => {
    if (currentShape) {
        startX = e.clientX - canvasRect.left;
        startY = e.clientY - canvasRect.top;
    }
    drawing = true;
    draw(e);
});
canvas.addEventListener('mousemove', (e) => {
    if (drawing && !currentShape) {
        draw(e);
    }
});
canvas.addEventListener('mouseup', (e) => {
    if (currentShape && drawing) {
        const endX = e.clientX - canvasRect.left;
        const endY = e.clientY - canvasRect.top;

        if (currentShape === 'rectangle') {
            drawRectangle(startX, startY, endX, endY);
        } else if (currentShape === 'circle') {
            drawCircle(startX, startY, endX, endY);
        }

        ctx.beginPath(); // Reset path after drawing
    }
    drawing = false;
});
canvas.addEventListener('mouseleave', () => {
    drawing = false;
    ctx.beginPath(); // Reset path if mouse leaves canvas
});

// Function to draw based on tool and color
function draw(e) {
    const x = e.clientX - canvasRect.left;  // Mouse X relative to canvas
    const y = e.clientY - canvasRect.top;   // Mouse Y relative to canvas

    if (tool === 'pencil') {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
    } else if (tool === 'eraser') {
        ctx.strokeStyle = '#FFFFFF'; // White for eraser
        ctx.lineWidth = 20; // Larger width for eraser
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Tool selection (Pencil)
pencilBtn.addEventListener('click', () => {
    tool = 'pencil';
    currentShape = null; // Disable shape tool
    resetButtonStyles();
    pencilBtn.style.backgroundColor = '#ddd';
});

// Tool selection (Eraser)
eraserBtn.addEventListener('click', () => {
    tool = 'eraser';
    currentShape = null; // Disable shape tool
    resetButtonStyles();
    eraserBtn.style.backgroundColor = '#ddd';
});

// Tool selection (Circle)
circleBtn.addEventListener('click', () => {
    currentShape = 'circle';
    tool = null; // Disable freehand drawing
    resetButtonStyles();
    circleBtn.style.backgroundColor = '#ddd';
});

// Function to reset button styles
function resetButtonStyles() {
    pencilBtn.style.backgroundColor = '';
    eraserBtn.style.backgroundColor = '';
    rectBtn.style.backgroundColor = '';
    circleBtn.style.backgroundColor = '';
}

// Function to draw a rectangle
function drawRectangle(x1, y1, x2, y2) {
    const width = x2 - x1;
    const height = y2 - y1;
    ctx.fillStyle = currentColor;
    ctx.fillRect(x1, y1, width, height);
}

// Function to draw a circle
function drawCircle(x1,  y1, x2, y2) {
    const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    ctx.fill();
}

// Change color of pencil
colorPicker.addEventListener('change', () => {
    if (tool === 'pencil') {
        currentColor = colorPicker.value;
    }
});

// Clear the canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download the canvas image
downloadBtn.addEventListener('click', () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "drawing.png";
    a.click();
});
