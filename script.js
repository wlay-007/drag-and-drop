const main = document.querySelector('.main');
const body = document.querySelector('body');
const blocks = document.querySelectorAll('.block');
let appendItem;
//touch
main.addEventListener('touchstart', touchStart);
main.addEventListener('touchmove', touchMove);
main.addEventListener('touchend', touchEnd);
main.addEventListener('touchcancel', touchCancel);

//drag
main.addEventListener('dragstart', dragStart);
main.addEventListener('dragend', dragEnd);
for (const block of blocks) {
    block.addEventListener('dragenter', dragEnter)
    block.addEventListener('dragleave', dragLeave)
    block.addEventListener('dragover', dragOver)
    block.addEventListener('drop', drop);
}
//drag functions
function dragStart(){
    setTimeout(()=>{
        main.classList.add('drag--opacity')
    },0)
}

function dragEnd(){
    main.classList.remove('drag--opacity');
}

function dragEnter(){
    this.classList.add('active');
}
function dragLeave(){
    this.classList.remove('active');
}
function dragOver (event){
    event.preventDefault();
}
function drop (){
    this.append(main);
    this.classList.remove('active');
}
//touch functions
function touchStart(event){
    event.preventDefault(); 
}

function touchMove(event){
    event.preventDefault();
    let touch = event.targetTouches[0];
    main.classList.add('opacity');
    main.style.top = touch.pageY - (main.offsetHeight/2) + 'px';
    main.style.left = touch.pageX - (main.offsetWidth/2) + 'px';
    for (const block of blocks) {
        if(main.getBoundingClientRect().top + main.offsetHeight / 2 < block.getBoundingClientRect().bottom &&
        main.getBoundingClientRect().right - main.offsetWidth / 2 > block.getBoundingClientRect().left &&
        main.getBoundingClientRect().left + main.offsetWidth / 2 < block.getBoundingClientRect().right &&
        main.getBoundingClientRect().bottom - main.offsetHeight / 2 > block.getBoundingClientRect().top){
            block.classList.add('active');
            appendItem = block;
        }
        else{
            block.classList.remove('active');
        }
    }
}

function touchEnd(){
    if(appendItem.classList.contains('active')){
        appendItem.append(main);
        for (const block of blocks) {
            block.classList.remove('active');
        }
    }
    main.classList.remove('opacity');
}
function touchCancel(){
    console.log('Cancel');
}
