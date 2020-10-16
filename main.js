let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money = 0,
    amount = [],
    expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: [],
    amount: [],
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, бар'); 
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth : function() {
        let sum = 0;
        for (let i=0;i<2;i++){
            expenses[i] = prompt('Введите обязательную строку расходов', 'Садик государственный');
            do {
                amount[i] = prompt('Во сколько это обойдётся?') - 0;
            } while (!isNumber(amount[i]));
            sum += amount[i];
        }
        return sum;
    },
    getAccumulatedMonth : function() {
        return appData.budget - expensesAmount;
    },
    getTargetMonth : function() {
        appData.period = Math.ceil(appData.mission/accumulatedMonth);
        if (appData.period>0) {
            return 'Месяцев до достижения цели: ' + appData.period;
        } else {
            return 'Цель не будет достигнута';
        }
    },
    getStatusIncome : function(num) {
        if (num<0) {
            return 'Что-то пошло не так';
        } else if (num>=0 && num<600) {
            return 'К сожалению, у вас уровень дохода ниже среднего';
        } else if (num<1200 && num>=600) {
            return 'У вас средний уровень дохода';
        } else if (num>=1200) {
            return 'У вас высокий уровень дохода';
        }
    }
};

appData.asking();
let expensesAmount = appData.getExpensesMonth();
let accumulatedMonth = appData.getAccumulatedMonth();
appData.budgetDay = Math.floor(accumulatedMonth/30);

console.log('Расходы за месяц ', expensesAmount);
console.log('Возможные расходы: ', appData.addExpenses);
console.log(appData.getTargetMonth());
console.log('Бюджет на день ', appData.budgetDay);
console.log(appData.getStatusIncome(appData.budgetDay));