let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money, 
 income = 'Фриланс', 
 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, бар'), 
 deposit = confirm('Есть ли у вас депозит в банке?'),
 mission = 150000,  
 expenses = [],
 amount = [],
 budgetDay,
 messageToYou,
 accumulatedMonth;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

const getExpensesMonth = function() {
    let sum = 0;
    for (let i=0;i<2;i++){
        expenses[i] = prompt('Введите обязательную строку расходов', 'Садик государственный');
        do {
            amount[i] = prompt('Во сколько это обойдётся?');
        } while (!isNumber(amount[i]));
        sum += amount[i];
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

const getTargetMonth = function() {
    let period = Math.ceil(mission/accumulatedMonth);
    if (period>0) {
        return 'Месяцев до достижения цели: ' + period;
    } else {
        return 'Цель не будет достигнута';
    }
};

const showTypeOf = function() {
    console.log(typeof(money));
    console.log(typeof(mission));
};

const getStatusIncome = function() {
    if (budgetDay<0) {
        messageToYou = 'Что-то пошло не так';
    } else if (budgetDay>=0 && budgetDay<600) {
        messageToYou = 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (budgetDay<1200 && budgetDay>=600) {
        messageToYou = 'У вас средний уровень дохода';
    } else if (budgetDay>=1200) {
        messageToYou = 'У вас высокий уровень дохода';
    }
    return console.log(messageToYou);
};

accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth/30);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

console.log('Расходы за месяц ', expensesAmount);
console.log('Возможные расходы: ', addExpenses);
console.log(getTargetMonth());
console.log('Бюджет на день ', budgetDay);
getStatusIncome();
showTypeOf();