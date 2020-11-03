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

class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.incomeMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }
}

const appData = new AppData();

AppData.prototype.start = function() {
    this.budget = salaryAmount.value;

    this.expensesMonth = 0;
    this.budgetMonth = 0;
    this.addExpenses = [];
    this.addIncome = [];
    
    this.getExpenses();
    this.getIncome();
    this.calcSavedMoney();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

    this.disabledInputs();
};

AppData.prototype.reset = function() {
    let allInputs = document.querySelectorAll('input');
    for (let i=0; i<allInputs.length; i++) {
        allInputs[i].value = '';
    }

    let inputs = document.querySelectorAll('input[type=text]');
    for (let i=0; i<inputs.length; i++) {
        inputs[i].disabled = false;
    }

    if(incomeItems.length>=2) {
        for (let i=1;i<incomeItems.length;i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        }
        incomeItems = document.querySelectorAll('.income-items');
    }

    if(expensesItems.length>=2) {
        for (let i=1;i<expensesItems.length;i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        }
        expensesItems = document.querySelectorAll('.expenses-items');
    }

    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    
    startButton.style.display = 'block';
    cancelButton.style.display = 'none';

    this.income =  {};
    this.addIncome =  [];
    this.expenses =  {};
    this.addExpenses =  [];
    this.deposit =  false;
    this.incomeMonth =  0;
    this.percentDeposit =  0;
    this.moneyDeposit =  0;
    this.budget =  0;
    this.budgetDay =  0;
    this.budgetMonth =  0;
    this.expensesMonth =  0;
};

AppData.prototype.disabledInputs = function() {
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
    let inputs = document.querySelectorAll('input[type=text]');
    for (let i=0; i<inputs.length; i++) {
        inputs[i].disabled = true;
    }
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
            _this.expensesMonth += +cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach((item) => {
        const itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
            _this.budgetMonth += +cashIncome;
        }
    });
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if(item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getBudget = function() {
    const _this = this;
    this.budgetMonth +=  +this.budget + this.incomeMonth - +this.expensesMonth;
    this.budgetDay = Math.floor(_this.budgetMonth/30);
};

AppData.prototype.getTargetMonth = function() {
    const _this = this;
    return Math.ceil(targetAmount.value/_this.budgetMonth);
};

AppData.prototype.calcSavedMoney = function() {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    startButton.addEventListener('click', () => {
        _this.start.apply(_this);
    });
    cancelButton.addEventListener('click', this.reset);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.calcSavedMoney);
    salaryAmount.addEventListener('input', () => {
        if (salaryAmount.value === '') {
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    });
};

appData.eventListeners();