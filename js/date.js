const concertDates = [
    {
        "date": "2024-08-08T00:00:00.000Z",
        "stadium": "ERNST-HAPPEL-STADION",
        "location": "Vienna"
    },
    {
        "date": "2024-08-09T00:00:00.000Z",
        "stadium": "ERNST-HAPPEL-STADION",
        "location": "Vienna"
    },
    {
        "date": "2024-08-10T00:00:00.000Z",
        "stadium": "ERNST-HAPPEL-STADION",
        "location": "Vienna"
    },
    {
        "date": "2024-08-15T00:00:00.000Z",
        "stadium": "WEMBLEY STADIUM",
        "location": "London"
    },
    {
        "date": "2024-08-16T00:00:00.000Z",
        "stadium": "WEMBLEY STADIUM",
        "location": "London"
    },
    {
        "date": "2024-08-17T00:00:00.000Z",
        "stadium": "WEMBLEY STADIUM",
        "location": "London"
    },
    {
        "date": "2024-08-19T00:00:00.000Z",
        "stadium": "WEMBLEY STADIUM",
        "location": "London"
    },
    {
        "date": "2024-08-20T00:00:00.000Z",
        "stadium": "WEMBLEY STADIUM",
        "location": "London"
    },
    {
        "date": "2024-11-14T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-11-15T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-11-16T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-11-21T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-11-22T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-11-23T00:00:00.000Z",
        "stadium": "ROGERS CENTRE",
        "location": "Toronto"
    },
    {
        "date": "2024-12-06T00:00:00.000Z",
        "stadium": "BC PLACE",
        "location": "Vancouver"
    },
    {
        "date": "2024-12-07T00:00:00.000Z",
        "stadium": "BC PLACE",
        "location": "Vancouver"
    },
    {
        "date": "2024-12-08T00:00:00.000Z",
        "stadium": "BC PLACE",
        "location": "Vancouver"
    }
];

// Example of creating countdowns
concertDates.forEach(concert => {
    const concertDate = new Date(concert.date);
    const now = new Date();
    const timeDiff = concertDate - now;

    if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        console.log(`Countdown to ${concert.stadium} in ${concert.location}: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    } else {
        console.log(`The concert at ${concert.stadium} in ${concert.location} has already passed.`);
    }
});
