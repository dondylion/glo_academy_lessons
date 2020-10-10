// Задание второе усложнённое

let num = 266219;
let result = 1;

num = num.toString();
num = num.split('');

for (let i = 0; i < num.length; i++) {
    result = result*num[i];
}

result = result*result*result;

result = result.toString();
console.log(result[0], result[1]);