let money = 60000, 
 income = 'Фриланс', 
 addExpenses = 'Сигареты, Бары, Таблетки', 
 deposit = true,
 mission = 150000, 
 period = 9, 
 budgetDay = money/30,
 expenses1,
 expenses2,
 amount1,
 amount2,
 budgetMonth,
 messageToYou;

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную строку расходов');
amount1 = prompt('Во сколько это обойдётся?');
expenses2 = prompt('Введите обязательную строку расходов');
amount2 = prompt('Во сколько это обойдётся?');

budgetMonth = money - amount1 - amount2;
period = mission/budgetMonth;
period = Math.ceil(period);
budgetDay = budgetMonth/30;
budgetDay = Math.floor(budgetDay);

if (budgetDay<0) {
    messageToYou = 'Что-то пошло не так';
} else if (0<=budgetDay<600) {
    messageToYou = 'К сожалению, у вас уровень дохода ниже среднего';
} else if (600<=budgetDay<1200) {
    messageToYou = 'У вас средний уровень дохода';
} else if (budgetDay>=1200) {
    messageToYou = 'У вас высокий уровень дохода';
}

console.log(addExpenses);
console.log(typeof(money));
console.log(typeof(mission));
console.log(typeof(period));
console.log('Длина строки addExpenses: ', addExpenses.length);
console.log('Период равен ', period, ' месяцев');
console.log('Цель: заработать ', mission, ' рублей');
console.log('Бюджет на месяц ', budgetMonth);
console.log('Месяцев для достижения цели: ', period);
console.log('Бюджет на день: ', budgetDay);
console.log(messageToYou);


