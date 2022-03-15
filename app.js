const body = document.querySelector('body');
const initBoard = function () {
    for(let i = 0; i < 16; i ++)
    {
        const bigDiv = document.createElement("div");
        bigDiv.classList.add('bigDiv')
        for(let j = 0; j < 16; j ++)
        {
            const div = document.createElement("div");
            div.classList.add('tile');
            bigDiv.appendChild(div);
        }
        body.appendChild(bigDiv);
        
    }
    
}
const changeColor = function(tile){
    tile.classList.add('blue');
}
initBoard();
const tiles = document.querySelectorAll('.tile');
for(const tile of tiles)
{
    tile.addEventListener('click', ()=>changeColor(tile));
}
