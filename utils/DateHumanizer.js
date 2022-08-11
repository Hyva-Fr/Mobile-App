export default function DateHumanizer(date, type = false) {

    let split = date.split(' '),
        calendar = split[0].split('-'),
        time = split[1].split(':'),
        year = calendar[0],
        month = parseInt(calendar[1]),
        day = calendar[2],
        hours = time[0],
        minutes = time[1],
        mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    if (type === 'date') {
        return day + ' ' + mois[month - 1] + ' ' + year;
    } else if (type === 'time') {
        return hours + 'h' + minutes;
    }
    return day + ' ' + mois[month - 1] + ' ' + year + ' à ' + hours + 'h' + minutes;
}