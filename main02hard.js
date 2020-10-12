let num = 266219, 
    result = 1;

num = num.toString();
num = num.split('');
for (let i = 0; i < num.length; i++) {
    result = result*num[i];
}
result = result**3;
result = result.toString();

console.log(result[0], result[1]);