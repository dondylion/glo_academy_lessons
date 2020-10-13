let money = prompt('Ваш месячный доход?'), 
 income = 'Фриланс', 
 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), 
 deposit = confirm('Есть ли у вас депозит в банке?'),
 mission = 150000,  
 expenses1 = prompt('Введите обязательную строку расходов'),
 amount1 = prompt('Во сколько это обойдётся?'),
 expenses2 = prompt('Введите обязательную строку расходов'),
 amount2 = prompt('Во сколько это обойдётся?'),
 period,
 budgetDay,
 messageToYou,
 accumulatedMonth;

const getExpensesMonth = function() {
    return amount1*1 + amount2*1;
};

const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
};

const getTargetMonth = function() {
    return Math.ceil(mission/accumulatedMonth);
};

const showTypeOf = function() {
    console.log(typeof(money));
    console.log(typeof(mission));
    console.log(typeof(period));
};

const getStatusIncome = function() {
    console.log(income);
};

accumulatedMonth = getAccumulatedMonth();
budgetDay = accumulatedMonth/30;

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

period = Math.ceil(period);
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


console.log('Расходы за месяц ', getExpensesMonth());
console.log('Возможные расходы: ', addExpenses);
console.log('Месяцев до достижения цели: ', getTargetMonth());
console.log('Бюджет на день ', budgetDay);
console.log(messageToYou);
getStatusIncome();
showTypeOf();


