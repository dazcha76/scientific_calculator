
$(document).ready(initiateApp);

var operation = [];
var thisNumber = 0;
var thisOperator = 0;
var result = 0;

function initiateApp(){
  $('.num').click(numberInput);
  $('.op').click(operatorInput);
  $('.equal').click(doMath);
}

function numberInput(){
  thisNumber = $(this).text();
  if(operation.length === 0){
    operation.push(thisNumber);
  } else {
    if(!isNaN(operation[operation.length - 1]) || operation[operation.length - 1] === '.'){
      operation[operation.length - 1] += thisNumber;
    } else {
      operation.push(thisNumber);
    }
  }
  display();
  console.log(operation);
}

function operatorInput(){
  thisOperator = $(this).text();
  operation.push(thisOperator);
  console.log(operation);
  display();
}

function doMath(){
  if(operation[1] === '+'){
    add();
  } else if(operation[1] === '-'){
    subtract();
  } else if(operation[1] === '*'){
    multiply();
  } else if(operation[1] === '/'){
    divide();
  }
 
  $('.display').text(result);
}

function add(){
  result = parseInt(operation[0]) + parseInt(operation[2]);
}

function subtract(){
  result = parseInt(operation[0]) - parseInt(operation[2]);
}

function multiply(){
  result = parseInt(operation[0]) * parseInt(operation[2]);
}

function divide(){
  result = parseInt(operation[0]) / parseInt(operation[2]);
}

function display(){
  console.log("you clicked on something");
  var displayOutput = '';
  if(operation.length > 0){
    for(var i = 0; i < operation.length; i++){
      displayOutput += operation[i];
    }
  } else {
    displayOutput = 0;
  }
  
  $('.display').text(displayOutput);
}
