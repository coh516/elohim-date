const elohimDate = () => {
    const fullYear = (new Date).getFullYear();
    const isLeapYear = ((fullYear % 4 == 0) && (fullYear % 100 != 0)) || (fullYear % 400 == 0);
    /*
    * @todo: first day of month begins on the 14'th day of January and extends its week to 11 days
    */
    (new Date).getMonth() === 1 && (new Date).getDate() < 15  && fullYear--;
    const newYearDay = `01-15-${fullYear}`;

    const daysSinceMonth = (month) => {
        return 73 * Math.floor(month/2) + (month % 2)*(isLeapYear && month === 9 ? 37 : 36)
    }

    const daysInMonth = (month) => {
        return daysSinceMonth(month) - daysSinceMonth(month-1);
    }

    const sunMonth = (month) => { 
        const ny = new Date(newYearDay); 
        ny.setDate(ny.getDate() +  73 * Math.floor(month/2) + (month % 2)*(isLeapYear && month === 9 ? 37 : 36));
        return ny;
    };

    const dateDistance = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }
    // sun weeks have one 11 day week during leap year
    const sunWeek = (date) => { 
        const ny = new Date(newYearDay); 
        const week = (date- ny.setDate(ny.getDate()) )/8.64e8; 
        const day = Math.ceil((week-Math.floor(week))*10);
        return { week: Math.ceil(week)-((isLeapYear && month === 9)?1:0), day: day+((isLeapYear && month === 9)?1:0),  dbg: week }
    };

    const sunDate = () => { 
        const ny = new Date(newYearDay); 
        let monthDay = (((new Date() - ny.setDate(ny.getDate()) )/.864e8)/(73/2)); 
        let month = Math.floor(monthDay); 
        let day = dateDistance(new Date(), sunMonth(month))
        return {year: (new Date).getFullYear()+34020, month, day, week: sunWeek(new Date()).week - sunWeek(sunMonth(month)).week, dayOfWeek: sunWeek(new Date()).day}
    };

    return {sunMonth, sunWeek, sunDate}
}
module.exports = { elohimDate };
console.log(elohimDate().sunMonth(0));