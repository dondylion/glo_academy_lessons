'use strict';

const dateOnScreen = function() {
    let now = new Date();
    //.........a.........
    let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        months = [' января ',' февраля ',' марта ',' апреля ',' мая ',' июня ',' июля ',' августа ',' сентября ',' октября ',' ноября ',' декабря '],
        hourWord = '',
        minuteWord = '',
        secondWord = '',
        str1 = '';
    document.open();

    switch(now.getHours()%10) {
        case 1:
            hourWord = ' час ';
            break;
        case 2:
        case 3:
        case 4:
            hourWord = ' часа ';
            break;
        default:
            hourWord = ' часов ';
            break;
    }

    switch(now.getMinutes()%10) {
        case 1:
            minuteWord = ' минута ';
            break;
        case 2:
        case 3:
        case 4:
            minuteWord = ' минуты ';
            break;
        default:
            minuteWord = ' минут ';
            break;
    } 

    switch(now.getSeconds()%10) {
        case 1:
            secondWord = ' секунда ';
            break;
        case 2:
        case 3:
        case 4:
            secondWord = ' секунды ';
            break;
        default:
            secondWord = ' секунд ';
            break;
    } 

    str1 += 'Сегодня '+ weekDays[now.getDay()] + ', ' + now.getDate() + months[now.getMonth()] +  now.getFullYear() + ' года, ' + now.getHours() + hourWord + now.getMinutes() + minuteWord + now.getSeconds() + secondWord;

    //........b..........

    let str2 = '';
    let month = now.getMonth() + 1;
    document.open();

    if(now.getDate()<10) {
        str2 += '0' + now.getDate() + '.';
    } else {
        str2 += now.getDate() + '.';
    }

    if(month<10) {
        str2 += '0' + month + '.';
    } else {
        str2 += month + '.';
    }

    str2 += now.getFullYear() + ' - ';

    if(now.getHours()<10) {
        str2 += '0' + now.getHours() + ':';
    } else {
        str2 += now.getHours() + ':';
    }

    if(now.getMinutes()<10) {
        str2 += '0' + now.getMinutes() + ':';
    } else {
        str2 += now.getMinutes() + ':';
    }

    if(now.getSeconds()<10) {
        str2 += '0' + now.getSeconds();
    } else {
        str2 += now.getSeconds();
    }

    document.writeln(str1, '</br>', str2);
};

setInterval(dateOnScreen, 1000);

