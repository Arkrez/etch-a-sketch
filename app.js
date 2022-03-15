const body = document.querySelector('body');
const actionContainer = document.querySelector('.container');

const eraser = document.querySelector('.eraser');
const draw = document.querySelector('.draw');
let undoStack = [];
let redoStack = [];
let toggle = false;

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
    if(!toggle)
        tile.classList.add('blue');
    else
    {
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

