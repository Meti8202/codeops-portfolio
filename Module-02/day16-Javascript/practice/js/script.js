console.log("Hello, world!");
console.log(30 + 90);
console.log(480 + "20"); 
console.log(480 + Number("20")); 

let name = "Meti";
console.log(name);
console.log(typeof name);
console.log(Number(name));
let age = "24";
console.log(age);
console.log(Number(age));

console.log(`My name is ${name} and I am ${age} years old.`);

// FizzBuzz, the ETB way
// Print 1–100, but "Tele" for multiples of 3, "Birr" for 5, "TeleBirr" for both — drilling % and control flow.

for (let number = 1; number <= 100; number++) {
  // console.log(number)
  if (number % 3 === 0) {
    console.log("Birr");
    continue;
  } else if (number % 5 === 0) {
    console.log("TeleBirr");
    continue;
  } else {
    console.log(number);
  }
}
   

