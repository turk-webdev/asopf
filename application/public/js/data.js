// window.addEventListener('load', (event) => {

// })
document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
        init();
    }
};

let advSearchHidden = false;
const searchBtn = document.getElementById('searchDb');
searchBtn.addEventListener('click', postSearch);

function toggleAdvSearch() {
    if (advSearchHidden) {
        advSearchHidden = false;
        document.getElementById('adv-search-toggle').textContent = "Hide Advanced Search";
    } else {
        advSearchHidden = true;
        document.getElementById('adv-search-toggle').textContent = "Show Advanced Search";
    }

    document.getElementById('adv-search').hidden = advSearchHidden;
}

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
                <th>${data[i].newcountconfirmed}</th>
                <th>${data[i].newcountdeaths}</th>
                <th>${data[i].date}</th>
            </tr>`
            ;
        }
    }
    // Insert html into table rows
    document.getElementById('myTable').innerHTML = output;
    document.getElementById('second-card').hidden = false;
    toggleAdvSearch();
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

// Copy of the post function, just used when page is loaded for the first time
async function init() {
    // Grab the input from the form
    const county = 'San Francisco';

    // Store the input into a JSON object
    const input = { county: county};

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
                <th>${data[i].newcountconfirmed}</th>
                <th>${data[i].newcountdeaths}</th>
                <th>${data[i].date}</th>
            </tr>`
            ;
        }
    }
    // Insert html into table rows
    document.getElementById('myTable').innerHTML = output;
    document.getElementById('second-card').hidden = false;
    advSearchHidden = false;
    document.getElementById('adv-search-toggle').textContent = "Hide Advanced Search";
};



// Array for the county search autocomplete
const counties = ["Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", 
"Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", "Kern", "Kings", "Lake", 
"Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", "Mendocino", "Merced", "Modoc", "Mono", "Monterey", 
"Napa", "Nevada", "Orange", "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", "San Diego", 
"San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", 
"Sierra", "Siskiyou", "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", "Tuolumne", "Ventura", 
"Yolo", "Yuba"];

// Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete
function autocomplete(inp, arr) {
    console.log('autocomplete()');
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items text-left");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }


autocomplete(document.getElementById("inputCounty"), counties);