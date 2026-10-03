export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}

export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function calculateAverage(numbers) {
  if (numbers.length == 0) return NaN;
  const sum = numbers.reduce((sum, curr) => sum + curr, 0);
  return sum / numbers.length;
}

export function calculateFactorial(num) {
  if (isNaN(num) || num < 0) return undefined;
  if (num == 0 || num == 1) return 1;
  let sum = 1;
  for (let i = 1; i <= num; i++) {
    sum *= i;
  }
  return sum;
}

export function getUser() {
  return { name: "Meet", age: 21 };
}

export function getNumbers() {
  return [1, 2, 3, 4, 5];
}

export function getScore() {
  return 85;
}

export function getName() {
  return "Meet Soni";
}

export function throwError() {
  throw new Error("Something went wrong");
}

export async function ayncName(){
    return {id:11,name:"hey"}
}
export async function asyncError(){
  throw new Error("User Not Found")
}

export const normalMethod={
  log(item){
    console.log('hello; ',item)
  },
  async norm(hey){
    return {name:hey}
  }
}

export const getApi=()=>{
  return process.env.API_KEY;
}

export function getCurrentDate() {
  return Date.now();
}

export function createTrackingToken() {
  return crypto.randomUUID();
}
