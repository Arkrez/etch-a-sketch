const body = document.querySelector('body');
const actionContainer = document.querySelector('.container');

const eraser = document.querySelector('.eraser');
const draw = document.querySelector('.draw');
const clear = document.querySelector('.clear');
const undo = document.querySelector('.undo');
const redo = document.querySelector('.redo');
const re8 = document.querySelector('.re8');
const re16 = document.querySelector('.re16');
const re32 = document.querySelector('.re32');
const re64 = document.querySelector('.re64');
const re128 = document.querySelector('.re128');
let undoStack = {};
let redoStack = {};
let toggle = false;
let undoStep = -1;
let redoStep = -1;
let ran = false;
let canDraw = false;
let lastSize = 16;
document.body.onmousedown = ()=>(canDraw = true);
document.body.onmouseup = ()=>{canDraw = false;};

const initBoard = function (size = 16) {
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
    
    const changedTile = [this, toggle];
    
    if(!toggle)
    {
        this.classList.add('blue');
        undoStack[undoStep] = changedTile;
    }
    else
    {
        undoStack[undoStep] = changedTile;
        this.classList.remove('blue');
    }
}

    





initBoard();



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

re8.addEventListener('click', () => {
    initBoard(8);
    lastSize = 8;
})
re16.addEventListener('click', () => {
    initBoard(16);
    lastSize = 16;
})
re32.addEventListener('click', () => {
    initBoard(32);
    lastSize = 32;
})
re64.addEventListener('click', () => {
    initBoard(64);
    lastSize = 64;
})
re128.addEventListener('click', () => {
    initBoard(128);
    lastSize = 128;
})

