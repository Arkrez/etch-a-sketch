const body = document.querySelector('body');
const actionContainer = document.querySelector('.container');

const eraser = document.querySelector('.eraser');
const draw = document.querySelector('.draw');
const undo = document.querySelector('.undo');
const redo = document.querySelector('.redo');
let undoStack = {};
let redoStack = {};
let toggle = false;
let undoStep = -1;
let redoStep = -1;

const initBoard = function (size = 16) {
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
            bigDiv.appendChild(div);
        }
        tileContainer.appendChild(bigDiv)
        
        
    }
    actionContainer.appendChild(tileContainer);
    
}
const changeColor = function(tile){
    undoStep++;   
    redoStep = -1;
    const changedTile = [tile, toggle];
    
    if(!toggle)
    {
        tile.classList.add('blue');
        undoStack[undoStep] = changedTile;
    }
    else
    {
        undoStack[undoStep] = changedTile;
        tile.classList.remove('blue');
    }
    
}

initBoard();
const tiles = document.querySelectorAll('.tile');
for(const tile of tiles)
{
    tile.addEventListener('click', ()=>changeColor(tile));
}

eraser.addEventListener('click', ()=>{toggle = true;})
draw.addEventListener('click', ()=>{toggle = false;})
undo.addEventListener('click', ()=>{
    if(undoStep < 0)
        return;
    redoStep++;
    
    if(!undoStack[undoStep][1])
        undoStack[undoStep][0].classList.remove('blue')
    else
        undoStack[undoStep][0].classList.add('blue');
    redoStack[redoStep] = undoStack[undoStep];
    delete undoStack[undoStep]
    
    undoStep--;
});
redo.addEventListener('click', ()=>{
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

