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
            amount[i] = prompt('Во сколько это обойдётся?') - 0;
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

const showTypeOf = function(a) {
    return typeof(a);
};

const getStatusIncome = function(num) {
    if (num<0) {
        return 'Что-то пошло не так';
    } else if (num>=0 && num<600) {
        return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (num<1200 && num>=600) {
        return 'У вас средний уровень дохода';
    } else if (num>=1200) {
        return 'У вас высокий уровень дохода';
    }
};

accumulatedMonth = getAccumulatedMonth();
budgetDay = Math.floor(accumulatedMonth/30);

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(',');

console.log('Расходы за месяц ', expensesAmount);
console.log('Возможные расходы: ', addExpenses);
console.log(getTargetMonth());
console.log('Бюджет на день ', budgetDay);
console.log(getStatusIncome(budgetDay));
console.log(showTypeOf(money));
console.log(showTypeOf(mission));