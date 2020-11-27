// THIS ISN'T WORKING PROPERLY - THE DOM'S ARE COMING BACK NULL
window.addEventListener("DOMContentLoaded",defaultView());

function defaultView() {
    console.log("test");
    if (detectMobile()) {
        console.log("mobile");
        showTable();
    } else {
        console.log("not mobile")
        if (innerWidth < 1500) {
            console.log("map only");
            showMap();
        } else {
            console.log("both");
            showBoth();
        }
    }
}

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
};

function showMap() {
    let self = document.getElementById('map-container');
    let other = document.getElementById('table-container');
    self.style.display = 'block';
    other.style.display = 'none';
    self.className = 'col-md-12';
    updateButtons();
}

function showTable() {
    let self = document.getElementById('table-container');
    let other = document.getElementById('map-container');
    self.style.display = 'block';
    other.style.display = 'none';
    self.className = 'col-md-12';
    updateButtons();
}

function showBoth() {
    let myTable = document.getElementById('table-container');
    let myMap = document.getElementById('map-container');
    console.log(myTable);
    console.log(myMap);
    myTable.style.display = 'block';
    myMap.style.display = 'block';
    myTable.className = 'col-md-6';
    myMap.className = 'col-md-6';
    updateButtons();
}

function updateButtons() {
    let buttons = document.getElementById('view-buttons').getElementsByTagName('button');
    for (let i=0; i<buttons.length; i++) {
        if (buttons[i].id.toString().toLowerCase() == elem.id.toString().toLowerCase()) {
            buttons[i].className = "btn btn-primary";
        } else {
            buttons[i].className = "btn btn-secondary";
        }
    }
    
}

function viewToggle(elem) {
    switch(elem.id.toString().toLowerCase()) {
        case 'map':
            showMap();
            break;
        case 'table':
            showTable();
            break;
        default:
            showBoth();
    }

    updateButtons();
}