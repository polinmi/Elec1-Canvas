// Get the necessary elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const pencilBtn = document.getElementById('pencilBtn');
const eraserBtn = document.getElementById('eraserBtn');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('download');

// Default settings
let drawing = false;
let tool = 'pencil'; // Can be 'pencil' or 'eraser'
let currentColor = '#000000'; // Default color is black
let lineWidth = 5; // Pencil width

// Get canvas offset relative to the page
const canvasRect = canvas.getBoundingClientRect();

// Set up event listeners for canvas
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const x = e.clientX - canvasRect.left; // Mouse X relative to canvas
    const y = e.clientY - canvasRect.top;  // Mouse Y relative to canvas

    if (tool === 'pencil' || tool === 'eraser') {
        draw(e); // Draw with pencil or eraser
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing && (tool === 'pencil' || tool === 'eraser')) {
        draw(e); // Draw with pencil or eraser
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Reset path after drawing
});

canvas.addEventListener('mouseleave', () => {
    drawing = false;
    ctx.beginPath(); // Reset path if mouse leaves canvas
});

// Function to draw based on tool and color
function draw(e) {
    const x = e.clientX - canvasRect.left; // Mouse X relative to canvas
    const y = e.clientY - canvasRect.top;  // Mouse Y relative to canvas

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
    pencilBtn.style.backgroundColor = '#ddd'; // Highlight pencil button
    eraserBtn.style.backgroundColor = ''; // Reset eraser button background
});

// Tool selection (Eraser)
eraserBtn.addEventListener('click', () => {
    tool = 'eraser';
    eraserBtn.style.backgroundColor = '#ddd'; // Highlight eraser button
    pencilBtn.style.backgroundColor = ''; // Reset pencil button background
});

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
