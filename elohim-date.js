const elohimDate = () => {
    const newYearDay = `${(new Date).getFullYear()}-01-15`;
    const sunMonth = (month) => { const ny = new Date(newYearDay); ny.setDate(ny.getDate() +  73 * Math.floor(month/2) + (month % 2)*36 ); return ny };
    const sunWeek = () => { const ny = new Date(newYearDay); const week = (new Date() - ny.setDate(ny.getDate()) )/8.64e8; return { week: Math.floor(week), day: Math.floor(week-Math.floor(week)) }};
    const sunDate = () => { const ny = new Date(newYearDay); let monthDay = (((new Date() - ny.setDate(ny.getDate()) )/.864e8)/(73/2)); let month = Math.floor(monthDay); let day = sunMonth(5).getDate(); return {year: (new Date).getFullYear()-34020, month, day, sunWeek: sunWeek().week, dayOfWeek: sunWeek().day}};
    return {sunMonth, sunWeek, sunDate}
}