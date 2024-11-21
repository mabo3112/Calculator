let number1 = -99;
let operand = "";
let number2 = -99;
let number1Set = false;
let number2Set = false;
let period = false;
let sign = false;
let result = "";

const clearButton = document.querySelector("#input-clear");
const display = document.querySelector("#display-text");
const numberButtons = document.querySelector(".number-buttons");
const resultButtons = document.querySelector("#operatorEval");
const operatorButtons = document.querySelectorAll("#input-mod, .operator-buttons .operators");
const periodButton = document.querySelector("#input-period")
const undoButton = document.querySelector("#input-undo");

numberButtons.addEventListener("mousedown", function(e) {
    // e.target.style.backgroundColor = "red";  
    if(display.textContent == "No div 0! >:|") {
        clear();
    }
    if(e.target.tagName === "BUTTON" && !e.target.classList.contains("no-update")){
            display.textContent += e.target.textContent;
            adjustFontSizeToFit(display);
    }

    if(e.target.classList.contains("sign-update")) {
        if(sign == false) {
            display.textContent = "-" + display.textContent;
            sign = true;
        }  else {
            display.textContent = display.textContent.slice(1);
            sign = false;
        }
    }

    
})

resultButtons.addEventListener("mousedown", function(e) {
    operate(number1, operand, number2);
})
periodButton.addEventListener("mousedown", function(e) {
    if(period === false)  {
        display.textContent += e.target.textContent;
        period = true;
    }
})
    

clearButton.addEventListener("mousedown", function(e) {
    clear();
})

undoButton.addEventListener("mousedown", function(e) {
    if(display.textContent == "No div 0! >:|") {
        clear();
    }
    if(display.textContent != "") {
        if(display.textContent.charAt(display.textContent.length - 1) == ".") {
            period = false;
        } else if(display.textContent.charAt(display.textContent.length - 1) == "-") {
            sign = false;
        }

        display.textContent = display.textContent.slice(0, -1);
    }
})
operatorButtons.forEach(button => {
    button.addEventListener("mousedown", function(e) {
    console.log(e.target.textContent);
    switch(e.target.textContent) {
    case "+":
        add();
        break;
    case "-":
        subtract();
        break;
    case "*":
        multiply();
        break;
    case "/":
        divide();
        break;
    case "%":
        mod();
        break;
    default:
        display.textContent = "unknown op.";
    }
});
});



function add() {
    if( operand == "") {
        operand = "+";
        number1 = display.textContent;
        number1Set = true;
        display.textContent = "";
        period = false;
        
    }

}

function subtract() {
    if( operand == "") {
        operand = "-";
        number1 = display.textContent;
        number1Set = true;
        display.textContent = "";
        period = false;
        

    }


}

function multiply() {
    if( operand == "") {
        operand = "*";
        number1 = display.textContent;
        number1Set = true;
        display.textContent = "";
        period = false;

    }



}


function divide() {
    if( operand == "") {
        operand = "/";
        number1 = display.textContent;
        number1Set = true;
        display.textContent = "";
        period = false;

    }


}

function mod() {
    if(operand == "") {
        operand = "%";
        number1 = display.textContent;
        number1Set = true;
        display.textContent = "";
        period = false;
    }
}


function clear(){
    number1 = -99;
    operand = "";
    number2 = -99;
    number1Set = false;
    number2Set = false;
    if(result % 1 == 0 || typeof result !== "number") {
        period = false;
    } else {
        period = true;
    }
    display.textContent = "";
    if(result < 0) {
        sign = true;
    } else {
        sign = false;
    }
    
}


function operate(number1, operand, number2) {
    if(number1Set && operand != ""){
        if(display.textContent != "") {
            number2 = display.textContent;
            
            let cancelCalc = false;
            const num1 = parseFloat(number1);
            const num2 = parseFloat(number2);
            switch(operand) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if(num2 !== 0) {
                        result = num1 / num2;
                    } else {
                        result = "No div 0! >:|"
                        cancelCalc = true;
                    }
                    break;
                case "%":
                    if(num2 !== 0 ) {
                        result = num1 % num2;
                    } else {
                        result = "No div 0! >:|"
                        cancelCalc = true;
                    }

                    break;
            }
            if(!cancelCalc) {
                console.log(result % 1);
                if(result % 1 !== 0){
                    result = result.toPrecision(12);
                }
                display.textContent = parseFloat(result);
                console.log(num1 + ", " + operand + ", " + num2);
                console.log(parseFloat(result));
                calculated = true;
                clear();
                number1 = parseFloat(result);
                number1Set = true;
                if(number1.length > 13) {
                    display.textContent = number1.toFixed(12);
                }
                display.textContent = number1;
                adjustFontSizeToFit(display);
            } else {
                clear();
                display.textContent = result;
            }
            
        } 
    }
    
}

function adjustFontSizeToFit(){
    const displayDiv = document.getElementById("display"); 
    const displaySpan = document.getElementById("display-text");
    let fontSize = 54;
    display.style.fontSize = fontSize + "px";
    console.log(displaySpan.offsetWidth + ", " + displayDiv.offsetWidth);
        while (displaySpan.offsetWidth > displayDiv.offsetWidth && fontSize > 10) {
            fontSize -= 1;
            displaySpan.style.fontSize = fontSize + "px";
        }
    
    console.log(displaySpan.style.fontSize);
    
}












