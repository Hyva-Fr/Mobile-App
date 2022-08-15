export function dateHumanizer(date, type = '') {

    let split = date.split('T'),
        calendar = split[0].split('-'),
        time = (split[1]) ? split[1].split(':') : '',
        year = calendar[0],
        month = parseInt(calendar[1]),
        day = parseInt(calendar[2]),
        hours = time[0],
        minutes = time[1],
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (day === 1) {
        day = '1st'
    } else if (day === 2) {
        day = '2nd'
    } else if (day === 3) {
        day = '3rd'
    } else {
        day += 'th'
    }

    if (type === 'date') {
        return day + ' of ' + months[month - 1] + ' - ' + year;
    } else if (type === 'time' && time !== '') {
        return hours + ':' + minutes;
    }
    return day + ' of ' + months[month - 1] + ' - ' + year + ' at ' + hours + ':' + minutes;
}

export function getSqlDate() {

    let d = new Date(),
        year = d.getFullYear(),
        month = ('0' + (d.getMonth() + 1)).slice(2),
        date = ('0' + (d.getDate()) + 1).slice(2),
        hour = ('0' + (d.getHours()) + 1).slice(2),
        minutes = ('0' + (d.getMinutes()) + 1).slice(2);

    return year + '-' + month + '-' + date + 'T' + hour + ':' + minutes;
}