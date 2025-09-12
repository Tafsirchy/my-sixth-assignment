# What is the difference between var, let, and const?
Answer: 
var:
1. var is function or global scoped.
2. var can be redeclared.
3. var can be updated.
4. var has function hoisting.

let:
1. let is block scoped.
2. let cannot be redeclared.
3. let can be updated.
4. let does not have function hoisting.

const:
1. const is block scoped.
2. const cannot be redeclared.


# What is the difference between map(), forEach(), and filter()?
Answer:
map():
1. Creates and returns a new array by applying a function to each element of the original array.
2. Do not change the original array.

forEach():
1.Executes a function on each element of the array but does not return a new array.
2. 

filter():
1. Creates and returns a new array containing only the elements that pass a test function.
2. Doesn’t modify the original array by itself, but since it’s used for side effects, if your callback changes the elements or external variables, the original data can be altered.


# What are arrow functions in ES6?
Answer:
1. Shorter way to write functions using the => operator.
2. Single-expression bodies return the value automatically without the return keyword.
3. Inherits this from the surrounding scope instead of having its own.
4. Arrow functions don’t have their own arguments object.

# How does destructuring assignment work in ES6?
Answer:
1. It helps you quickly take values out of arrays or objects and put them into separate variables.
2. You can assign elements from an array to variables based on their position.
3. You can extract properties from an object by matching property names.
4. You can provide default values if the unpacked value is undefined.

# Explain template literals in ES6. How are they different from string concatenation?
Answer:
1. Template literals allow you to embed expressions inside string literals using ${expression}.
2. They can span multiple lines and include multi-line strings.
3. They can include expressions and variables directly inside the string.
4. They are different from string concatenation because they allow for more complex expressions and can include multi-line strings.
5. Template literals are enclosed in backticks (`` ` ``) instead of single or double quotes.