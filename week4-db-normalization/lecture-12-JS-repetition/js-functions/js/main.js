/**
 * Normal function declaration is moved up to the top of the script automatically befind the scence
 * This process is called hoisting
 * Meaning can run the function before its declared
 */

console.log("########## Normal function ############")
normalFunction(); // Runs the function before its declared, affected by hoisting

function normalFunction() {
    console.log('Normal function')
}


function normalFunctionWithReturn() {
    return 'Normal function with return'
    console.log(normalFunctionWithReturn())
}

console.log("########## Function expression ############")
const functionExpression = function() {
    console.log('Function expression')
}

functionExpression()


console.log("########## Arrow functions ############")

/**
 * Arrow function without shorthand is used often when not needing a return
 * Or when needing lots of multiline logic
 */
const arrowFunction = () => {
    console.log('Arrow function with console log')
}
arrowFunction()

const arrowFunctionWithReturn1 = () => {
    return 'Arrow function with return'
}
console.log(arrowFunctionWithReturn1())


/**
 * Arrow function with shorthand is alwase used with return statment, and sometimes with minimal one line logic
 */
// Arrow function with shorthand - Return statement is built in when removing the curly braces
const arrowFunctionWithReturn2 = () =>  'Arrow function shorthand with return'

console.log(arrowFunctionWithReturn2());

// Arrow function with shorthand - Return statement with multiple lines by using paranthesis 
const arrowFunctionWithReturn3 = () =>  ({
    text:  'Arrow function shorthand with return, returning an object', 
    done: true
})

console.log(arrowFunctionWithReturn3());