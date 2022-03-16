const body = document.querySelector('body');
const actionContainer = document.querySelector('.container');

const eraser = document.querySelector('.eraser');
const draw = document.querySelector('.draw');
const clear = document.querySelector('.clear');
const undo = document.querySelector('.undo');
const redo = document.querySelector('.redo');
const color = document.querySelector('.color');
const rainbow = document.querySelector('.rainbow');

let undoStack = {};
let redoStack = {};
let toggleEraserOn = false;
let undoStep = -1;
let redoStep = -1;
let ran = false;
let canDraw = false;
let lastSize = 16;
let newBoardVal = 1;
let isBoardUpdated = true;
let red = 0;
let blue = 0;
let green = 0;
let rbgVal = `rgb(${red}, ${green}, ${blue})` 
let rainbowMode = true;
document.body.onmousedown = ()=>(canDraw = true);
document.body.onmouseup = ()=>{
    canDraw = false; 
    
    if(!isBoardUpdated){ 
        initBoard(newBoardVal); 
        isBoardUpdated = true;
        
    }
};

const initBoard = function (size = 32) {
    if(ran)
    {
        actionContainer.removeChild(document.querySelector('.tileContainer'));

    }
    const tileContainer = document.createElement('div');
    tileContainer.classList.add('tileContainer')
    for(let i = 0; i < size; i ++)
    {
        const bigDiv = document.createElement("div");
        bigDiv.classList.add('tileRowContainer')
        for(let j = 0; j < size; j ++)
        {
            const div = document.createElement("div");
            div.classList.add('tile');
            div.style.width = 512/size + 'px';
            div.style.height = 512/size +'px';
            div.style.backgroundColor = "white";
            bigDiv.appendChild(div);
        }
        tileContainer.appendChild(bigDiv)
        
        
    }
    actionContainer.appendChild(tileContainer);
    const tiles = document.querySelectorAll('.tile');
    for(const tile of tiles)
    {
        tile.addEventListener('mousedown', changeColor);
        tile.addEventListener('mouseover', changeColor);
        

    }
    ran = true;
}
function changeColor(e){
    if(e.type === 'mouseover' && !canDraw) return;
    undoStep++;   
    redoStep = -1;
    
    const changedTile = [this, this.style.backgroundColor];
    
    if(!toggleEraserOn)
    {
        if(rainbow)
            rbgVal = UpdateColorRainbow();
        this.style.backgroundColor = rbgVal;
        undoStack[undoStep] = changedTile;
    }
    else
    {
        undoStack[undoStep] = changedTile;
        this.style.backgroundColor = "white";
    }
}

    





initBoard();
function UpdateColorRainbow()
{
    r = Math.round(Math.random() * 256);
    g = Math.round(Math.random() * 256);
    b = Math.round(Math.random() * 256);
    return rbgVal = `rgb(${r}, ${g}, ${b})`
}
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = `${slider.value} x ${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `${this.value} x ${this.value}`;
  isBoardUpdated = false;
  newBoardVal = this.value;
  
}

eraser.addEventListener('click', ()=>{toggleEraserOn = true;})
draw.addEventListener('click', ()=>{toggleEraserOn = false;})
undo.addEventListener('click', ()=>{
    if(undoStep < 0)
        return;
    redoStep++;
    
    
    const tileToRevert = undoStack[undoStep];

    tileToRevert[0].style.backgroundColor = tileToRevert[1];
    
    
    redoStack[redoStep] = undoStack[undoStep];
    delete undoStack[undoStep]
    
    undoStep--;
});
redo.addEventListener('click', ()=>{
    if(redoStep === -1)
        redoStack = {};
    if(redoStep < 0)
        return;
    undoStep++;
    
    if(redoStack[redoStep][1])
    {
        redoStack[redoStep][0].classList.remove('blue');
    }
    else
        redoStack[redoStep][0].classList.add('blue');
    undoStack[undoStep] = redoStack[redoStep];
    delete redoStack[redoStep];
    redoStep--;
});
clear.addEventListener('click', () => {
    initBoard(lastSize);
});

color.addEventListener('click', ()=>{});
rainbow.addEventListener('click', () =>{rainbowMode = true;})
