const searchBtn = document.getElementById('searchDb');
searchBtn.addEventListener('click', postSearch);

async function postSearch(e) {
    e.preventDefault();

    // Grab the input from the form
    const county = document.getElementById('inputCounty').value;
    const date = document.getElementById('inputDate').value;
    const deaths = document.getElementById('inputDeaths').value;
    const cases = document.getElementById('inputCases').value;

    // Store the input into a JSON object
    const input = { county: county, date: date, deaths: deaths, cases: cases};

    // Set the fetch api options for our POST request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input)
    };

    let output = ''; // holds the inserted html

    // Asynchronous function to send POST request to server at specified url
    const response = await fetch('/api', options);
    // Wait until the response is received and then store it into data
    const data = await response.json();
    console.log(data);
    // If data has been received then insert the html into page
    if (data) {
        console.log("Server Response Received");
        for (i = 0; i < data.length; i++) { 
            output += 
            `<tr>
                <th>${data[i].county}</th>
                <th>${data[i].totalcountconfirmed}</th>
                <th>${data[i].totalcountdeaths}</th>
                <th>${data[i].newcountconfirmed}</th>
                <th>${data[i].newcountdeaths}</th>
                <th>${data[i].date}</th>
            </tr>`
            ;
        }
    }
    // Insert html into table rows
    document.getElementById('myTable').innerHTML = output;

    // fetch('/api', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         county: county,
    //         date: date,
    //         deaths: deaths,
    //         cases: cases
    //     }),
    //     headers: 'application/json'
    // }).then(result => {
    //     result.json();
    // }).then(data => {
    //     console.log(data);
    // }).catch(err => {
    //     console.log(err);
    // });
};