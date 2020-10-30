'use strict';

let myForm = document.querySelector('body'),
    startButton = document.getElementById('start'),
    cancelButton = document.getElementById('cancel'),
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
        this.budget = salaryAmount.value;

        this.expensesMonth = 0;
        this.budgetMonth = 0;
        this.addExpenses = [];
        this.addIncome = [];
        
        this.getExpenses();
        this.getIncome();
        this.getInfoDeposit();
        this.calcSavedMoney();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        this.disabledInputs();
    },
    applyStart: function() {
        appData.start.apply(appData);
    },
    reset: function() {
        let allInputs = document.querySelectorAll('input');
        for (let i=0; i<allInputs.length; i++) {
            allInputs[i].value = '';
        }

        let inputs = document.querySelectorAll('input[type=text]');
        for (let i=0; i<inputs.length; i++) {
            inputs[i].disabled = false;
        }

        startButton.style.display = 'block';
        cancelButton.style.display = 'none';
    },
    disabledInputs: function() {
        startButton.style.display = 'none';
        cancelButton.style.display = 'block';
        let inputs = document.querySelectorAll('input[type=text]');
        for (let i=0; i<inputs.length; i++) {
            inputs[i].disabled = true;
        }
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
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
        this.budgetMonth +=  +this.budget + this.incomeMonth - +this.expensesMonth;
        this.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth : function() {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
    },
    getInfoDeposit : function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Введите годовой процент вашего депозита', 10) - 0;
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Введите сумму вашего депозита', 100000) - 0;
            } while (!isNumber(this.moneyDeposit));
        }
    },
    calcSavedMoney : function() {
        return this.budgetMonth * periodSelect.value;
    },
    changeNumber : function() {
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    }
};


startButton.addEventListener('click', appData.applyStart);
cancelButton.addEventListener('click', appData.reset);
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