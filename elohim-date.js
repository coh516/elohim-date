const elohimDate = () => {
    const fullYear = (new Date).getFullYear();
    const isLeapYear = ((fullYear % 4 == 0) && (fullYear % 100 != 0)) || (fullYear % 400 == 0);
    (new Date).getMonth() === 1 && (new Date).getDate() < 15  && fullYear--;
    const newYearDay = `${fullYear}-01-15`;

    const sunMonth = (month) => { 
        const ny = new Date(newYearDay); 
        ny.setDate(ny.getDate() +  73 * Math.floor(month/2) + (month % 2)*(isLeapYear && month === 4 ? 37 : 36));
        return ny;
    };

    // sun weeks have one 11 day week during leap year
    const sunWeek = () => { 
        const ny = new Date(newYearDay); 
        const week = (new Date() - ny.setDate(ny.getDate()) )/8.64e8; 
        return { week: Math.floor(week), day: Math.floor(week-Math.floor(week)) }
    };

    const sunDate = () => { 
        const ny = new Date(newYearDay); 
        let monthDay = (((new Date() - ny.setDate(ny.getDate()) )/.864e8)/(73/2)); 
        let month = Math.floor(monthDay); let day = sunMonth(5).getDate(); 
        return {year: (new Date).getFullYear()+34020, month, day, sunWeek: sunWeek().week, dayOfWeek: sunWeek().day}
    };

    return {sunMonth, sunWeek, sunDate}
}