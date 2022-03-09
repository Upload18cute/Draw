const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#000000";

canvas.width = 1400;
canvas.height = 700;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function handelCanvasClick()
{
    if (filling)
    {
        ctx.fillRect(0, 0, 1400, 700);
    }
}

function handleModeClick()
{
    if (filling === true)
    {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleRangeChange(event)
{
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleColorClick(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick));
function stopPainting()
{
    painting = false;
}

function startPainting()
{
    painting = true;
}

function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown()
{
    painting = true;
}

function handleSaveClick()
{
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a")
    link.href = image;
    link.download = "YourPaint";
    link.click();
}

if (canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handelCanvasClick);
}

if (range)
{
    range.addEventListener("input", handleRangeChange);
}

if (mode)
{
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn)
{
    saveBtn.addEventListener("click", handleSaveClick);
}