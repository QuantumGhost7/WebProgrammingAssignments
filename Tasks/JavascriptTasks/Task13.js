window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Draw a red rectangle
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 150, 100);

    // Draw a blue circle
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(250, 150, 50, 0, Math.PI * 2);
    ctx.fill();
};