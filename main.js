'use strict';

let startButton = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    addExpItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItem = document.querySelectorAll('.income_items');

startButton.disabled = true;

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(str) {
    return !isNumber(str) && !null;
};


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    incomeMonth: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start : function() {

        appData.budget = salaryAmount.value;

        appData.expensesMonth = 0;
        appData.budgetMonth = 0;
        appData.addExpenses = [];
        appData.addIncome = [];
        
        appData.getExpenses();
        appData.getIncome();
        appData.getStatusIncome();
        appData.getInfoDeposit();
        appData.calcSavedMoney();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },
    addExpensesBlock : function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock : function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses : function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
                appData.expensesMonth += +cashExpenses;
            }
        });
    },
    getIncome : function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
                appData.budgetMonth += +cashIncome;
            }
        });
    },
    getAddExpenses : function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome : function() {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget : function() {
        appData.budgetMonth +=  +appData.budget + appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth : function() {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
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
        return appData.budgetMonth * periodSelect.value;
    },
    changeNumber : function() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    }
};

startButton.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changeNumber);
salaryAmount.addEventListener('input', function(){
    if (salaryAmount.value === '') {
        startButton.disabled = true;
    } else {
        startButton.disabled = false;
    }
});


/*console.log('Расходы за месяц ', appData.expensesMonth);
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
    if (i === 0) {
        newStr += appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
    } else {
        newStr += ', ' + appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
    }
}
console.log(newStr);
*/