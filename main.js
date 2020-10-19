let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return !isNumber(str) && !null;
};

let money = 0;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 12,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        
        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнитеьный заработок?', 'Рента');
            } while(!isString(itemIncome));
            do {
                cashIncome = prompt('Сколько приносит дополнительный заработок?', 10000) - 0;
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, бар'); 
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        let keyExp = ''; //ключ для элемента объекта с расходами
        for (let i=0;i<2;i++){
            do {
                keyExp = prompt('Введите обязательную строку расходов', 'Садик государственный');
            } while(!isString(keyExp));
            do {
                appData.expenses[keyExp] = prompt('Во сколько это обойдётся?') - 0;
            } while (!isNumber(appData.expenses[keyExp]));
            appData.expensesMonth += appData.expenses[keyExp];
        }
    },
    getBudget : function() {
        appData.budgetMonth =  appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth : function() {
        appData.period = Math.ceil(appData.mission/appData.budgetMonth);
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
    },
    getInfoDeposit : function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Введите годовой процент вашего депозита', 10) - 0;
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Введите сумму вашего депозита', 100000) - 0;
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney : function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getBudget();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log('Расходы за месяц ', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.budgetDay));

console.log('Наша программа включает в себя данные:');
for (let k in appData) {
    console.log(k, ' : ', appData[k]);
}

// Восьмое задание
console.log('************ Задание восьмое ************');
let newStr = '';
for (let i in appData.addExpenses) {
    appData.addExpenses[i] = appData.addExpenses[i].trim();
    if (i == 0) {
        newStr += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
    } else {
        newStr += ', ' + appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
    }
}
console.log(newStr);
