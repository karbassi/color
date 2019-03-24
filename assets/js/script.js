function $(query) {
    return document.querySelector(query);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// select RGB inputs
let red = $('#red');
let green = $('#green');
let blue = $('#blue');

// selet num inputs
let redVal = $('#slider-red');
let greenVal = $('#slider-green');
let blueVal = $('#slider-blue');

// select labels
let redLbl = $('label[for=red]');
let greenLbl = $('label[for=green]');
let blueLbl = $('label[for=blue]');

randomColor();

// init display Colors
displayColors();

// init Color Vals
colorNumbrVals();

// init ColorSliderVals
initSliderColors();

// init Change Range Val
changeRangeNumVal();

// init Colors controls
colorSliders();

function randomColor() {
    red.value = random(50, 255);
    green.value = random(50, 255);
    blue.value = random(50, 255);
}

// display colors
function displayColors() {
    let rgb = `rgb(${red.value}, ${green.value}, ${blue.value})`;

    // Set background color
    $('body').style.backgroundColor = rgb;

    // Set title
    document.title = rgb;

    // Set text
    $('#text').innerText = rgb;

    // Set Favicon
    let size = 1;
    let canvas = document.createElement('canvas');
    if (typeof canvas.getContext === 'function') {
        var ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
    }

    if (!ctx) {
        return false;
    }

    ctx.fillStyle = rgb;
    ctx.fillRect(0, 0, size, size);

    let el = $('[rel=icon]');

    let parent = el.parentNode;
    if (parent) {
        parent.removeChild(el);
    }

    el.href = canvas.toDataURL();
    if (parent) {
        parent.appendChild(el);
    }
}

// initial color val when DOM is loaded
function colorNumbrVals() {
    redVal.value = red.value;
    greenVal.value = green.value;
    blueVal.value = blue.value;
}

// initial colors when DOM is loaded
function initSliderColors() {
    // label bg colors
    redLbl.style.background = `rgb(${red.value}, 0, 0)`;
    greenLbl.style.background = `rgb(0, ${green.value}, 0)`;
    blueLbl.style.background = `rgb(0, 0, ${blue.value})`;

    // slider bg colors
    sliderFill(red);
    sliderFill(green);
    sliderFill(blue);
}

// Slider Fill offset
function sliderFill(clr) {
    let val = (clr.value - clr.min) / (clr.max - clr.min);
    let percent = val * 100;

    // clr input
    if (clr === red) {
        clr.style.background = `linear-gradient(to right, rgb(${clr.value}, 0, 0) ${percent}%, #ccc 0%)`;
    } else if (clr === green) {
        clr.style.background = `linear-gradient(to right, rgb(0, ${clr.value}, 0) ${percent}%, #ccc 0%)`;
    } else if (clr === blue) {
        clr.style.background = `linear-gradient(to right, rgb(0, 0, ${clr.value}) ${percent}%, #ccc 0%)`;
    }
}

// change range values by number input
function changeRangeNumVal() {
    // Validate number range
    redVal.addEventListener('change', () => {
        // make sure numbers are entered between 0 to 255
        if (redVal.value > 255) {
            alert('cannot enter numbers greater than 255');
            redVal.value = red.value;
        } else if (redVal.value < 0) {
            alert('cannot enter numbers less than 0');
            redVal.value = red.value;
        } else if (redVal.value == '') {
            alert('cannot leave field empty');
            redVal.value = red.value;
            initSliderColors();
            displayColors();
        } else {
            red.value = redVal.value;
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    greenVal.addEventListener('change', () => {
        // make sure numbers are entered between 0 to 255
        if (greenVal.value > 255) {
            alert('cannot enter numbers greater than 255');
            greenVal.value = green.value;
        } else if (greenVal.value < 0) {
            alert('cannot enter numbers less than 0');
            greenVal.value = green.value;
        } else if (greenVal.value == '') {
            alert('cannot leave field empty');
            greenVal.value = green.value;
            initSliderColors();
            displayColors();
        } else {
            green.value = greenVal.value;
            initSliderColors();
            displayColors();
        }
    });

    // Validate number range
    blueVal.addEventListener('change', () => {
        // make sure numbers are entered between 0 to 255
        if (blueVal.value > 255) {
            alert('cannot enter numbers greater than 255');
            blueVal.value = blue.value;
        } else if (blueVal.value < 0) {
            alert('cannot enter numbers less than 0');
            blueVal.value = blue.value;
        } else if (blueVal.value == '') {
            alert('cannot leave field empty');
            blueVal.value = blue.value;
            initSliderColors();
            displayColors();
        } else {
            blue.value = blueVal.value;
            initSliderColors();
            displayColors();
        }
    });
}

// Color Sliders controls
function colorSliders() {
    [red, green, blue].forEach(element => {
        element.addEventListener('input', () => {
            displayColors();
            initSliderColors();
            changeRangeNumVal();
            colorNumbrVals();
        });
    });
}
