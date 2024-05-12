const express = require('express');
const app = express();
const { elohimDate } = require('./elohim-date');
const ics = require('ics');
const port = 3100;
const os = require('os');

// Get the network interfaces
const networkInterfaces = os.networkInterfaces();

const getIp =()=> {
    // Get the first non-internal IPv4 address
    let ipAddress = '';
    for (let name in networkInterfaces) {
        for (let interface of networkInterfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                ipAddress = interface.address;
                break;
            }
        }
        if (ipAddress) {
            break;
        }
    }
        return ipAddress; // return the ipAddress

}
app.get('/', (req, res) => {
    let result = `
    <html>
        <body>
            <h1>Sun Month Values</h1>
            ${getIp()}
            <a href="/sunMonth" download="sunMonth.ics">
                <button>Download Calendar</button>
            </a>
            <ul>
    `;
    for (let i = 0; i <= 9; i++) {
        const date = elohimDate().sunMonth(i);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        result += `<li>Month ${i}: ${formattedDate}</li>`;
 
    }
    result += '</ul></body></html>';
    res.send(result);
});

app.get('/sunMonth', (req, res) => {
    let events = [];
    for (let i = 0; i < 10; i++) {
        const sunMonthValue = elohimDate().sunMonth(i);
        const event = {
            start: [sunMonthValue.getFullYear(), sunMonthValue.getMonth() + 1, sunMonthValue.getDate()],
            duration: { hours: 1 },
            title: `Sun Month Event ${i}`,
            description: `Event for Sun Month ${i}`,
            location: 'Earth',
            status: 'CONFIRMED',
        };
        events.push(event);
    }

    ics.createEvents(events, (error, value) => {
        if (error) {
            console.log(error);
            return;
        }

        res.setHeader('Content-Type', 'text/calendar');
        res.send(value);
    });
});

app.listen(port, () => {
    console.log('Server is running on port 3100');
})