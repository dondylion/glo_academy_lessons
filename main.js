let money = 60000; // доход в месяц
let income = 'Фриланс'; // дополнительный доход
let addExpenses = 'Сигареты, Бары, Таблетки'; // дополнительные расходы
let deposit = true;
let mission = 150000; // желаемые накопления
let period = 9; // месяцев

console.log('Типы данных: money - ', typeof(money), ', mission - ', typeof(mission), ', period - ', typeof(period));
console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ', period, ' месяцев');
console.log('Цель: заработать ', mission, ' рублей');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');
console.log(addExpenses);

let budgetDay = money/30;
console.log(budgetDay);

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
