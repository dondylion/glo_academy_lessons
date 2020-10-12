let money = 60000; // доход в месяц
let income = 'Фриланс'; // дополнительный доход
let addExpenses = 'Сигареты, Бары, Таблетки'; // дополнительные расходы
let deposit = true;
let mission = 150000; // желаемые накопления
let period = 9; // месяцев
let budgetDay = money/30;

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

console.log(addExpenses);
console.log(typeof(money));
console.log(typeof(mission));
console.log(typeof(period));
console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ', period, ' месяцев');
console.log('Цель: заработать ', mission, ' рублей');
console.log(budgetDay);


