let week = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
let now = new Date();

for (let i in week) {
    if (i == 0 || i == 6) {
        if (i == now.getDay()) {
            document.writeln(week[i].italics().bold() , '<br>');
        } else {
            document.writeln(week[i].italics() , '<br>');
        }
    } else if (i == now.getDate()) {
        document.writeln(week[i].bold() , '<br>');
    } else {
        document.writeln(week[i] , '<br>');
    }
}