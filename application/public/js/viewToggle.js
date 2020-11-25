function viewToggle(elem) {
    let self;
    let other;
    var buttons = elem.parentNode.getElementsByTagName('button');
    switch(elem.id.toString().toLowerCase()) {
        case 'map':
            self = document.getElementById('map-container');
            other = document.getElementById('table-container');
            self.hidden = false;
            other.hidden = true;
            self.className = 'col-md-12';
            break;
        case 'table':
            self = document.getElementById('table-container');
            other = document.getElementById('map-container');
            self.hidden = false;
            other.hidden = true;
            self.className = 'col-md-12';
            break;
        default:
            let table = document.getElementById('table-container');
            let map = document.getElementById('map-container');
            table.hidden = false;
            map.hidden = false;
            table.className = 'col-md-6';
            map.className = 'col-md-6';
    }

    for (let i=0; i<buttons.length; i++) {
        if (buttons[i].id.toString().toLowerCase() == elem.id.toString().toLowerCase()) {
            buttons[i].className = "btn btn-primary";
        } else {
            buttons[i].className = "btn btn-secondary";
        }
    }
}