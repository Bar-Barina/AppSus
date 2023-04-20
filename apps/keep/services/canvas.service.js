
export const canvasService =  {
    startDraw,
    drawRect,
    drawShape,
}

function startDraw(ev) {
    this.startPosition.x = ev.clienX;
    this.startPosition.y = ev.clientY;
}

function drawRect(ev , ctx) {
        ctx.beginPath()
        ctx.rect(ev.offsetX, ev.offsetY, 50, 50);
        ctx.closePath()
        ctx.strokeStyle = "#000"
        ctx.stroke()
}

function drawShape(shape) {
    if(shape === 'rect') this.drawRect(ev , ctx)
}

// function stopDraw(ev) {
//     this.drawMode = false
//     this.startPosition.x = null
//     this.startPosition.y = null
// }
