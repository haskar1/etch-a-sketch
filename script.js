const container = document.querySelector('.container');
const slider = document.querySelector("#myRange");
let sliderText = document.querySelector(".slidertext");
const clearBtn = document.querySelector('.clearBtn');
const rainbowBtn = document.querySelector('.rainbowBtn');
const eraserBtn = document.querySelector('.eraserBtn');

let isDown = false;
document.body.onmousedown = () => {
    isDown = true;
};
document.body.onmouseup = () => {
    isDown = false;
};

function createGrid(gridLength) {
    container.style.gridTemplateColumns =  `repeat(${gridLength}, 1fr)`;
    container.style.gridTemplateRows =  `repeat(${gridLength}, 1fr)`;

    for (let i=0; i < (gridLength * gridLength); i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mousedown', changeColor);
        square.addEventListener('mouseover', changeColor);
        container.appendChild(square);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !isDown) return
    if (rainbowBtn.classList.contains("active")) {
        const randomR = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${randomR}, ${randomB}, ${randomG})`;
    } else if (eraserBtn.classList.contains("active")){
        e.target.style.backgroundColor = "";
    } else {
        e.target.style.backgroundColor = "black"; 
    } 
}

let countRainbow = 0;
rainbowBtn.addEventListener('click', () => {
    if (eraserBtn.classList.contains('active')) {
        eraserBtn.classList.remove('active');
        eraserBtn.style = "none";
        countEraser = 0;        
    }

    rainbowBtn.classList.toggle('active');
    if (countRainbow == 1) {
        rainbowBtn.style = "none";
        countRainbow = 0;
    } else {
        rainbowBtn.style.backgroundColor = "rgba(3, 96, 255, 0.3)";
        countRainbow = 1;
    }
});

let countEraser = 0;
eraserBtn.addEventListener('click', () => {
    if (rainbowBtn.classList.contains('active')) {
        rainbowBtn.classList.remove('active');
        rainbowBtn.style = "none";
        countRainbow = 0;        
    }
    
    eraserBtn.classList.toggle('active');
    if (countEraser == 1) {
        eraserBtn.style = "none";
        countEraser = 0;
    } else {
        eraserBtn.style.backgroundColor = "rgba(3, 96, 255, 0.3)";
        countEraser = 1;
    }
});

function sliderTextFunc() {
    let square = document.querySelector(".square");
    sliderText.style.width = `${square.offsetWidth}px`;
    sliderText.style.height = `${square.offsetWidth}px`;
    sliderText.style.backgroundColor = "black";    
}

slider.oninput = function() {
    container.textContent = "";
    createGrid(slider.value);
    sliderTextFunc();
}

clearBtn.addEventListener('click', () => {
    container.textContent = "";
    createGrid(slider.value);
});

window.onload = function() {
    createGrid(40);
    sliderTextFunc();
}




