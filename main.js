
$(document).ready(initiateApp);

var operation = [];
var inputNumber = '';
var inputClass = '';
var inputOperator = '';
var result = 0;
var firstNumber = 0;
var secondNumber = 0;
var rolloverNumber = 0;
var thisOperator = '';
var thisIndex = 0;
var pi = '3.14159265';
var rand = '';
var napiers = '2.71828182';

function initiateApp(){
  $('.num, .pi, .randomNum, .napiers').click(numberInput);
  $('.op').click(operatorInput);
  $('.equal').click(doMath);
  $('.clear_all').click(clearAll);
  $('.clear_element').click(clearElement);
  $('.tab').click(expandCalculator);
  $('.squared, .cubed, .e-xed, .ten-xed').click(exponents);
  $('.percent').click(percent);
  $('.pos_neg').click(togglePosNeg);
}

// INPUTS

function numberInput(){
  inputClass = $(this).attr('class');
  if(inputClass === 'pi'){
    inputNumber = pi;
  } else if(inputClass === 'randomNum'){
    rand = inputNumber = generateRandomNumber();
  } else if(inputClass === 'napiers'){
    inputNumber = napiers;
  } else {
    inputNumber = $(this).text();
  }

  if(operation.length === 0){
    operation.push(inputNumber);
  } else {
    if(operation[operation.length - 1].includes('.') && inputNumber === "."){
      return
    } else if(operation[operation.length - 1] === pi || operation[operation.length - 1] === rand || operation[operation.length - 1] === napiers){
      return
    }else if(!isNaN(operation[operation.length - 1]) || operation[operation.length - 1] === '.'){
      operation[operation.length - 1] += inputNumber;
    } else {
      operation.push(inputNumber);
    }
  }
  display();
}

function operatorInput(){
  inputOperator = $(this).text();
  if(operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === '*' || operation[operation.length - 1] === '/'){
    operation[operation.length - 1] = inputOperator;
    display();
    return
  }

  if(operation.length === 0){
    return
  } else {
    operation.push(inputOperator);
  }
  display();
}

// BASIC CALCULATIONS

function doMath(){
  if(operation.length === 0){
    result = 'READY';
  } 

  for(var i = 0; i < operation.length; i++){
    orderOfOperations();
    i = 0;
    firstNumber = rolloverNumber = operation[i];
    secondNumber = operation[i + 2];
    thisOperator = operation[i + 1];
    if(secondNumber === undefined){
      secondNumber = firstNumber;
    } 

    if(thisOperator === '+'){
      add();
    } else if(thisOperator === '-'){
      subtract();
    } else if(thisOperator === '*'){
      multiply();
    } else if(thisOperator === '/'){
      divide();
    }
    removeAndReplace3Items();
  }
  $('.display').text(result);
}

function add(){
  result = parseFloat(firstNumber) + parseFloat(secondNumber);
}

function subtract(){
  result = parseFloat(firstNumber) - parseFloat(secondNumber);
}

function multiply(){
  result = parseFloat(firstNumber) * parseFloat(secondNumber);
}

function divide(){
  if(parseFloat(firstNumber) / parseFloat(secondNumber)  === Infinity){
    result = "ERROR";
  } else {
    result = parseFloat(firstNumber) / parseFloat(secondNumber);
  }
}

function orderOfOperations(){
  for(var i = 0; i < operation.length; i++){
    if(operation.includes('*') && operation.length > 2){
      thisIndex = operation.indexOf('*');
      thisOperator = operation[thisIndex];
      firstNumber = operation[thisIndex-1];
      secondNumber = operation[thisIndex+1];
      multiply();
      removeAndReplaceMultiplicationAndDivision()
    } else if(operation.includes('/') && operation.length > 2){
      thisIndex = operation.indexOf('/');
      thisOperator = operation[thisIndex];
      firstNumber = operation[thisIndex-1];
      secondNumber = operation[thisIndex+1];
      divide();
      removeAndReplaceMultiplicationAndDivision()
    }
  }
}

function clearElement(){
  operation.pop();
  clearVariables();
  display();
}

function clearAll(){
  operation = [];
  clearVariables();
  display();
}

function clearVariables(){
  firstNumber = 0;
  secondNumber = 0;
  thisOperator = '';
  result = 0;
  inputNumber = '';
}

function display(){
  var displayOutput = '';
  if(operation.length > 0){
    displayOutput = operation[operation.length - 1];
  } else {
    displayOutput = 0;
  }
  $('.display').text(displayOutput);
}

function expandCalculator(){
  if($('.tab > i').attr('class') === 'fas fa-angle-left'){
    $('.tab').css('animation-name', 'move_tab_left');
    $('.classsic_calculator').css('animation-name', 'move_calc_right');
    $('.calc_container').css('animation-name', 'move_container_right');
    $('.scientific_calculator').css('animation-name', 'move_sci_left');
    
    $('.fas').removeClass('fa-angle-left').addClass('fa-angle-right');
  } else if($('.tab > i').attr('class') === 'fas fa-angle-right'){
    $('.tab').css('animation-name', 'move_tab_right');
    $('.classsic_calculator').css('animation-name', 'move_calc_left');
    $('.calc_container').css('animation-name', 'move_container_left');
    $('.scientific_calculator').css('animation-name', 'move_sci_right');
    
    $('.fas').removeClass('fa-angle-right').addClass('fa-angle-left');
  }
}

// SCIENTIFIC CALCULATOR

function generateRandomNumber(){
  var randomNumber = Math.random();
  randomNumber = randomNumber.toFixed(7).toString();
  return randomNumber;
}

function percent(){
  firstNumber = operation[operation.length-1];
  result = firstNumber/100;
  removeAndReplace2Items();
  $('.display').text(result);
}

function togglePosNeg(){
  operation[operation.length-1] = operation[operation.length-1] * -1
  $('.display').text(operation[operation.length-1]);
}

function exponents(){
  firstNumber = parseFloat(operation[operation.length-1]);
  inputClass = $(this).attr('class');
  if(inputClass === 'squared'){
    result = firstNumber * firstNumber;
  } else if(inputClass === 'cubed'){
    result = firstNumber * firstNumber * firstNumber;
  } else if(inputClass === 'e-xed'){
    result = 1;
    for(var i = 0; i < firstNumber; i++){
      result *= napiers;
    }
  } else if(inputClass === 'ten-xed'){
    result = 1;
    for(var i = 0; i < firstNumber; i++){
      result *= 10;
    } 
  }
  removeAndReplace2Items();
  $('.display').text(result);
}

// REMOVE AND REPLACE FUNCTIONS

function removeAndReplace2Items(){
  operation.splice(0, 2);
  operation.splice(0, 0, result.toString());
}

function removeAndReplace3Items(){
  operation.splice(0, 3);
  operation.splice(0, 0, result.toString());
}

function removeAndReplaceMultiplicationAndDivision(){
  operation.splice(thisIndex-1, 3);
  operation.splice(thisIndex-1, 0, result.toString());
}