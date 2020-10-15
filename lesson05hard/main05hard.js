// 1
/*let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isTwoOrFour = function(str) {
    str = str + '';
    if (str[0]==='2' || str[0]==='4') {
        console.log(str);
    }
};

let arr = [];

for (let i=0; i<7; i++) {
    do {
        arr[i] = prompt('Введите число');
    } while (!isNumber(arr[i]));
    isTwoOrFour(arr[i]);
}*/

//2

const isSimple = function(num) {
    for (let k=num; k>=1; k--) {
        if (num%k==0 && k!=num && k!=1){
            return false;
        }
    }
    return true;
};

for (i=2; i<=100; i++) {
    if(isSimple(i)) {
        console.log(i);
    };
}


