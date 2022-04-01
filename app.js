
//Creating references to buttons/other html elements
const body = document.querySelector('body');
const actionContainer = document.querySelector('.container');
const eraser = document.querySelector('.eraser');
const draw = document.querySelector('.draw');
const clear = document.querySelector('.clear');
const undo = document.querySelector('.undo');
const redo = document.querySelector('.redo');
const color = document.querySelector('.color');
const rainbow = document.querySelector('.rainbow');
//Container/logic for undo/redo/eraser
let undoStack = {};
let redoStack = {};
let redoStep = -1;
let toggleEraserOn = false;
let undoStep = -1;

let ran = false;
let canDraw = false;
let lastSize = 16;
let isBoardUpdated = true;
let rgbVal = `rgb(${0}, ${0}, ${0})`;
let rainbowMode = true;
//Keeping track of mouse down and up so that we can drag and draw
document.body.onmousedown = ()=>(canDraw = true);
document.body.onmouseup = ()=>{
    canDraw = false; 
    
    if(!isBoardUpdated){ 
       
        initBoard(lastSize); 
        isBoardUpdated = true;
        
    }
};

//create board based on input, board is made of divs and gets appended to the .continer class
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
//Changes color of tile and keeps track of original and changed color
function changeColor(e){
    if(e.type === 'mouseover' && !canDraw) return;
    undoStep++;
    redoStack={};   
    redoStep = -1;
    
    const originalTile = [this, this.style.backgroundColor];
    
    if(!toggleEraserOn)
    {
        
        if(rainbowMode)
        {
            rgbVal = UpdateColor();
        }
        
            
        
        this.style.backgroundColor = rgbVal;
        const changedTile = [this, rgbVal];
        undoStack[undoStep] = [originalTile, changedTile];
    }
    else
    {
        undoStack[undoStep] = [originalTile, [this, "white"]];
        this.style.backgroundColor = "white";
    }
}

    





initBoard();

//updating color to random color
function UpdateColor()
{
    if(rainbowMode)
    {
        r = Math.round(Math.random() * 256);
        g = Math.round(Math.random() * 256);
        b = Math.round(Math.random() * 256);
    }
    
    return rgbVal = `rgb(${r}, ${g}, ${b})`
}
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = `${slider.value} x ${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `${this.value} x ${this.value}`;
  isBoardUpdated = false;
  lastSize = this.value;
  
}

//event listeners for buttons
eraser.addEventListener('click', ()=>{toggleEraserOn = true;})
draw.addEventListener('click', ()=>{rainbowMode = false; toggleEraserOn = false; canDraw})
undo.addEventListener('click', ()=>{
    if(undoStep < 0)
        return;
    const tileToRevert = undoStack[undoStep];
    redoStack[++redoStep] = tileToRevert;
    tileToRevert[1][0].style.backgroundColor = tileToRevert[0][1];
    delete undoStack[undoStep]
    undoStep--;
    
});
redo.addEventListener('click', ()=>{
    if(redoStep < 0 || !redoStack)
    {
        redoStep = -1;
        redoStack = {};
        return;
    }
    undoStep++;
    const tileToRevert = redoStack[redoStep];
    tileToRevert[0][0].style.backgroundColor = tileToRevert[1][1];
    undoStack[undoStep] = tileToRevert;
    delete tileToRevert;
    redoStep--;
});
clear.addEventListener('click', () => {
    initBoard(lastSize);
});

color.addEventListener('click', ()=>{});
rainbow.addEventListener('click', () =>{rainbowMode = true; canDraw = true;})

