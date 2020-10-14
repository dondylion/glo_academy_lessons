let arr = prompt('Введите строку');

const arrToChange = function(arg) {
    if (typeof(arg)!='string') {
        arg = 'Введена не строка';
    } else {
        arg = arg.trim();
        if (arg.length > 30) {
        arg = arg.slice(0, 29) + '...';
        }
    }

    return console.log(arg);
};

arrToChange(arr);