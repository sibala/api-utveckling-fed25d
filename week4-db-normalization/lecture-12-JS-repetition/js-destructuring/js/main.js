// Destructuring array
console.log("########## Destructuring array ############");
let colors = ['red', 'blue', 'yellow'];

// May assign the array elements to variables, WITHOUT array destructuring
// let variable1 = colors[0]
// let variable2 = colors[1]
// let variable3 = colors[2]
// console.log(variable1, variable2, variable3)


// Rewriting the above code WITH array destructuring
let [variable1, variable2, variable3] = colors
console.log(variable1, variable2, variable3)


// Destructuring object
console.log("########## Destructuring object ############");
let person = {
    firstname: 'John',
    lastname: 'Doe',
    age: 33
}


// May assign the object attributes to variables, WITHOUT object destructuring
// let firstname = person.firstname
// let lastname = person.lastname
// let age = person.age
// console.log(firstname, lastname, age)


// Rewriting the above code WITH object destructuring
let {firstname, lastname, age} = person
console.log(firstname, lastname, age)