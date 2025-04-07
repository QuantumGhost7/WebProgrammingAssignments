window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    canvas.width = 400; // Ensure width
    canvas.height = 300; // Ensure height

    const ctx = canvas.getContext("2d");

    // Draw a blue rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 100, 50);

    // Draw a red circle
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(150, 100, 30, 0, Math.PI * 2);
    ctx.fill();

    // Function to clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Draw a green triangle
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(200, 50);
    ctx.lineTo(250, 100);
    ctx.lineTo(150, 100);
    ctx.closePath();
    ctx.fill();

    // Draw text
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Hello, Canvas!", 100, 200);
};

