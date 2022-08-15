export default function DateHumanizer(date, type = '') {

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