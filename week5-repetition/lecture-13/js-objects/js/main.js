// Variables
let firstName = "Johan";


// Function
function printName(firstName) {
    console.log(`My name is ${firstName}`)
}

printName();




console.log('############# Objects intro  ############');
let house = {
    // Properties
    color: 'red',
    windows: 4,
    area: 400,

    // Methods
    description: function() {
        console.log(this)
        return `This is a ${this.color} house with ${this.windows} windows`
    }
}

console.log(house)
// The properties of the house
console.log(house.color)
console.log(house.windows)
console.log(house.area)
// May also call the properties in a way similar to arrays index
console.log(house['color'])
console.log(house['windows'])
console.log(house['area'])
// Properties similar to arrays are often used with loops
for (property in house ) {
    console.log(house[property])
}

console.log(`This is a ${house.color} house with ${house.windows} windows`)


// The methods of the house
console.log(house.description());


// The benefits of coding with objects and classes
let houseB = Object.create(house);
houseB.color = 'Purple'
houseB.windows = 20
houseB.area = 600
console.log(houseB.color)
console.log(houseB.windows)
console.log(houseB.area)
console.log(houseB.description())


console.log('############# Object with init(), a function similar to constructor ############');
let person = {
    // Properties
    firstName: 'John',
    lastName: 'Doe',
    age: 33,

    // Methods
    init: function(firstName, lastName, age) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
    },

    fulltName: function() {
        return `${this.firstName} ${this.lastName}`
    },

    description: function() {
        console.log(this)
        return `Hello my name is ${this.fulltName()}, and Im ${this.age} years old`
    }
}

// Explaining "this"
console.log(houseB.description()) // "this" refers to the houseB object
console.log(person.description()) // "this" referes to the person object
console.log(this)                 // "this" referes to the main object in JS which is window
// Note, "this" doesnt work well inside arrow functions.


let alma = Object.create(person)
alma.firstName = 'Alma'
alma.lastName = 'Isaksson'
alma.age = 25
console.log(alma.description())

let lottie = Object.create(person)
lottie.init('Lottie', 'Jonsson', 29)
console.log(lottie.description())


console.log('############# Classes  ############');


class AnimalBlueprint {
    constructor(name, sound, favoritFood) {
        // Properties
        this.name        = name
        this.sound       = sound
        this.favoritFood = favoritFood
    }

    // Method
    getFrase() {
        return `My name is ${this.name} and I like to eat ${this.favoritFood}, ${this.sound}`
    }
}

let mouse = new AnimalBlueprint('Micky', 'piip piip', 'cheese')
console.log(mouse.getFrase())

let lion = new AnimalBlueprint('Simba', 'AAAAAAARRRRRRHHHHH', 'YOU')
console.log(lion.getFrase())







console.log('############# About built-in objects nad functions ############');


console.log([1, 2, 3].length)   // property
console.log([1, 2, 3].push(4))  // method
console.log("string".length)    // property
console.log("string".slice(-1)) // method
console.log((123).toString())   // method
console.log(new Date().getFullYear())  // Built in class
console.log(Math.PI)                   // Built in Object 


// In JavaScript, objects are king. If you understand objects, you understand JavaScript.





// When to use a Class/blueprint and when to use an object right away
// When the need to work with multiple examples av the same object accours, then a blueprint/class is more appropiate
new Date()

// When working with only ONE object, then no need to create a blueprint/class. May create the object straight away.
Math.PI